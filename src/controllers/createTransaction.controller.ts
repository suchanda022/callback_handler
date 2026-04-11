import { Request,Response } from "express";
import { createTransactionService } from "../services/transaction.service";



export const createCtransactiononctroller = async (req:Request,res:Response)=>{
    try {
        const payload = req.body;
        const service = createTransactionService();

      res.status(200)
    .json({
        success:true,
        message:"Transaction created successfully",
        data:payload
    })       
    } catch (error: any) {
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message || "Transaction creation failed" 

        })
    }

}