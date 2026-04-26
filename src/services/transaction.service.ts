import { AppDataSource } from "../config/data-source";
import { CallbackRepository } from "../repositories/callback.repository"


export async function createTransactionService(payload:any,flowType:string){
    const repo = CallbackRepository(); 
     const{userid,amount} = payload;
     if(!userid||!amount){
        throw new Error("Invalid transaction payload");
     }
     const gatewayTransactionId = `GTX-${Date.now()}`;
     const transaction = {
        gatewayTransactionId,
        amount,
        status:"PENDING",
        merchantCustomerId:userid,
        
     }

     const saved = await repo.saveTransaction(transaction)

     return {
        message:"transaction started",
        data:saved
     };
    
};

