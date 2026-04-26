import { Request, Response } from "express";

import { createTransactionService } from "../services/transaction.service";

export const createTransactionController = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const transaction = await createTransactionService(
            { ...payload },
            payload.flowType || "PAY"
        );

        return res.status(201).json({
            success: true,
            message: transaction.message || "Transaction started successfully",
            data: transaction,
        });
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Transaction creation failed",
        });
    }
};
