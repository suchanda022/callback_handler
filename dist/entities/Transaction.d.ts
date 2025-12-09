import { User } from "./User";
export declare class Transaction {
    id: number;
    gateway_transaction_id: string;
    payee_vpa: string;
    payer_vpa: string;
    payee_name: string;
    payer_name: string;
    amount: number;
    status: string;
    gateway_transaction_code: string;
    meta: any;
    user: User;
}
//# sourceMappingURL=Transaction.d.ts.map