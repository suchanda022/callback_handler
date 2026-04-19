
import { AppDataSource } from "../config/data-source";
import { CallbackRepository } from "../repositories/callback.repository"
import { mapGatewaycodetoStatus } from "../utils/gateway-status";






export function createCallbackService () {
    
    
   const  repo = CallbackRepository();   // this repo is private dependency  
  
    async function processCallback(payload:any){                    // this is a  method & entry point
        const{
           type,
           gatewayTransactionId,
           merchantCustomerId,
           amount,
           status} = payload;

           if(!type||!gatewayTransactionId||!merchantCustomerId){
            throw new Error("Invalid callback payload");
           }
           const internalStatus = mapGatewaycodetoStatus(status);


        switch (type) {
            case "CUSTOMER_DEBITED_VIA_COLLECT":
            case "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_COLLECT":
                return handleCollectFlow(payload,internalStatus);
                
            case "CUSTOMER_DEBITED_VIA_PAY":
            case "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_PAY":
                return handleDirectPayFlow(payload,internalStatus);
        
            default:
                throw new Error ("invalid callback")
        }
    }

    // handlers 

    async function handleCollectFlow(payload:any,status:string){
        return AppDataSource.transaction(async()=>{
            return await createdebitTransaction(payload, "COLLECT");
        });
    }
    
    async function handleDirectPayFlow(payload:any,status:string){
        //const {gatewayTransactionId,merchantCustomerId,amount} = payload;

        return AppDataSource.transaction(async()=>{
            return await createdebitTransaction(payload, "PAY");

        });
        

     
    }



    async function createdebitTransaction(payload:any,paymentmode:"PAY"|"COLLECT") {
        const {
             merchantCustomerId,
             gatewayTransactionId,
             amount,
             response_code,
             payee_vpa,
             payer_vpa,
             payee_name,
             payer_name,
             type
             
        } = payload;
          if (payee_vpa !== process.env.MERCHANT_VPA) {
            console.warn (`Received callback with invalid payee VPA: ${payee_vpa}`);
            throw new Error("Invalid payee VPA");
        }



        const user = await repo.findUserById(
            merchantCustomerId
        );
        if(!user){
            throw new Error ("user does not exist")
        }
        const newstatus = mapGatewaycodetoStatus(response_code);

      

        const existingtxn = await repo.findTransactionByGatewayId(gatewayTransactionId);
        //idempotency
        if(existingtxn && existingtxn.status === "SUCCESS"){
            return existingtxn;
        }

        
            
           if(!response_code){
            throw new Error("Gateway response code is missing");
           }
 
     return await repo.saveTransaction({
      gatewayTransactionId,
      amount,
      status: newstatus,
      user,
      payeeVpa: payee_vpa,
      payerVpa:payer_vpa,
      payeeName: payee_name,
      payerName: payer_name,
      gateway_transaction_code: response_code,
      typeofcb : type
    });
    }
    return {processCallback};


}




    




