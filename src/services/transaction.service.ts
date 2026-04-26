import { AppDataSource } from "../config/data-source";
import { razorpayInstance } from "../config/razorpay";
import { CallbackRepository } from "../repositories/callback.repository"


export async function createTransactionService(payload:any,flowType:string){
    const repo = CallbackRepository(); 
     const{userid,amount} = payload;
     if(!userid||!amount){
        throw new Error("Invalid transaction payload");
     }
   const order = await razorpayInstance.orders.create({
    amount: amount * 100, // convert to paisa
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });
     const transaction = {
        gatewayTransactionId:order.id,
        amount,
        status:"PENDING",
        merchantCustomerId:userid,
        
     }

     const saved = await repo.saveTransaction(transaction)

     return {
        message:"transaction started",
        data:saved,
        razorpayid:order.id
     };
    
};

