import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  callbackSchema,
  createTransactionSchema,
} from "../validations/paymentsschema.validation";
import { transactionCallbackController } from "../controllers/callback.controller";
import { createTransactionController } from "../controllers/createTransaction.controller";

const router = Router();

router.post(
  "/callback",
  validate(callbackSchema),
  transactionCallbackController
);
router.post(
  "/create-transaction",
  validate(createTransactionSchema),
  createTransactionController
);
export default router; 