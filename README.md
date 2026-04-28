
# Payment Callback Handler Service

> A production-grade backend service simulating real-world payment gateway integration — built with reliability, idempotency, and clean architecture at its core.

---

## Why This Exists

Payment systems fail in subtle ways — duplicate webhooks, race conditions, inconsistent gateway responses. This project tackles those exact problems: how do you guarantee a payment is recorded **exactly once**, even when Razorpay fires the same callback three times in 200ms?

---

## Architecture

```
Client / Gateway
      │
      ▼
┌─────────────────────┐
│   Express Router     │  ← Input validation (Joi)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Service Layer      │  ← Business logic, orchestration
└────────┬────────────┘
         │
         ├──────────────────────────────┐
         ▼                              ▼
┌─────────────────┐          ┌─────────────────────┐
│  Redis Cache     │          │  Repository Layer    │
│                  │          │                     │
│ Idempotency keys │          │ TypeORM + PostgreSQL │
│ (TTL: 24hr)      │          │ Entities, Relations  │
└─────────────────┘          └─────────────────────┘


Callback Flow:
──────────────
Razorpay Webhook
      │
      ▼
 Check Redis ──► Key exists? ──► 409 Reject (duplicate)
      │
      │ (first time)
      ▼
 Set Redis key (SETNX)
      │
      ▼
 Open DB Transaction
      │
      ▼
 Validate + Update Transaction Status
      │
      ▼
 Commit + Return 200
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | TypeORM |
| Cache | Redis (ioredis) |
| Validation | Joi |
| Payment Gateway | Razorpay Orders API |

---

## Key Design Decisions

**1. Two-layer idempotency**
Redis handles the fast path — if a `gatewayTransactionId` key exists in cache, the request is rejected in microseconds before touching Postgres. The DB unique constraint acts as a hard fallback if Redis is unavailable. This mirrors how production payment systems at scale handle concurrent webhook delivery.

**2. Service / Repository pattern**
Clean separation between business logic (service) and data access (repository). Every layer has one job. Easy to test, easy to extend.

**3. Unified status model**
Razorpay returns a mix of response codes depending on the transaction type. All of them are normalized into three internal states: `SUCCESS`, `FAILED`, `PENDING` — so downstream consumers never need to know about gateway internals.

**4. DB transactions for state updates**
Every callback that mutates a transaction record is wrapped in a PostgreSQL transaction. No partial updates, no inconsistent state, even if the process crashes mid-write.

---

## API Reference

### POST `/api/transactions/create`
Initiates a new payment transaction and creates a Razorpay order.

**Request**
```json
{
  "userId": "uuid",
  "amount": 500,
  "type": "PAY",
  "merchantVpa": "merchant@upi"
}
```

**Response**
```json
{
  "transactionId": "uuid",
  "razorpayOrderId": "order_xxx",
  "status": "PENDING"
}
```

---

### POST `/api/transactions/callback`
Handles incoming payment gateway webhooks. Idempotent — safe to retry.

**Request**
```json
{
  "gatewayTransactionId": "pay_xxx",
  "razorpayOrderId": "order_xxx",
  "status": "SUCCESS",
  "responseCode": "00"
}
```

**Response**
```json
{
  "message": "Callback processed",
  "transactionId": "uuid",
  "status": "SUCCESS"
}
```

**Duplicate callback (already processed)**
```
HTTP 409 Conflict
{ "message": "Duplicate callback rejected" }
```

---

## Running Locally

**Prerequisites:** Node.js 18+, PostgreSQL, Redis

```bash
# 1. Clone and install
git clone https://github.com/yourusername/payment-callback-service
cd payment-callback-service
npm install

# 2. Set environment variables
cp .env.example .env
# Fill in DB credentials, Redis URL, Razorpay keys

# 3. Run migrations
npm run typeorm migration:run

# 4. Start the server
npm run dev
```

**.env.example**
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payments_db
DB_USER=postgres
DB_PASSWORD=yourpassword

REDIS_URL=redis://localhost:6379

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

## Entity Model

```
User
 └── id, name, email, vpa, createdAt

Transaction
 └── id, userId (FK), amount, type (PAY | COLLECT)
 └── status (PENDING | SUCCESS | FAILED)
 └── gatewayTransactionId (UNIQUE), razorpayOrderId
 └── createdAt, updatedAt
```

---

## What I'd Add Next

- [ ] Webhook signature verification (Razorpay HMAC validation)
- [ ] Retry queue for PENDING transactions using Bull + Redis
- [ ] Prometheus metrics endpoint for callback success/failure rates
- [ ] Unit tests for service layer with Jest

---

## Author

Built by [Your Name] · [LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)
