
import { CallbackRepository } from "../repositories/callback.repository"




export function createCallbackService () {
    
    
   const  callbackrepo = CallbackRepository();
  


    async function processCallback(payload:any){                    // this is a class method & entry point
        const{type} = payload; 

        switch (type) {
            case "CUSTOMER_DEBITED_VIA_COLLECT":
                return handleCustomerDebitedViaCollect(payload);
                
            case "CUSTOMER_DEBITED_VIA_PAY":
                return hanndlerCustomerDebitedViaPay(payload);
        
            default:
                throw new Error ("invalid callback")
        }
    }

    // handlers 

    async function handleCustomerDebitedViaCollect(payload:any){
     return createdebitTransaction(payload,"COLLECT")

    }

    async function hanndlerCustomerDebitedViaPay(payload:any){
     return createdebitTransaction(payload,"PAY")
    }



    async function createdebitTransaction(
        payload:any,
        paymentmode:"PAY"|"COLLECT"
       
    ) {const {
             merchantCustomerId,
             gatewayTransactionId ,
             amount
        } = payload;

        const user = await callbackrepo.findUserById(
            merchantCustomerId
        );

        if(!user){
            throw new Error ("user does not exist")
        }

        const existingtxn = await callbackrepo.findtransactionByGatewayId(  gatewayTransactionId);
        //idempotency
        if(existingtxn){
            return existingtxn;
        }

        if(paymentmode==="PAY"){
         
        }

        if(paymentmode === "COLLECT"){
               
        }

     return await callbackrepo.saveTransaction({
      gatewayTransactionId,
      amount,
      status: "success",
      user,
    });
    }
    return {processCallback};


}




    




