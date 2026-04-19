import { Request,Response } from "express";

import { createTransactionService } from "../services/transaction.service";



export const createCtransactiononctroller = async (req:Request,res:Response)=>{
    try {
        const {v4:uuidv4} = await import("uuid");
        const payload = req.body;
        const idempotencyKey = uuidv4();  // generate unique idempotency key for this transaction
        const transaction = await createTransactionService({
            
        });
        

       return res.status(201)
    .json({
        success:true,
        message:"Transaction created successfully",
        data:transaction
    })       
    } catch (error: any) {
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message || "Transaction creation failed" 

        })
    }

}