
import { error } from "console";
import { CallbackRepository } from "../repositories/callback.repository"
import { mapGatewaycodetoStatus } from "../gateway-status";




export function createCallbackService () {
    
    
   const  repo = CallbackRepository();   // this repo is private dependency  
  


    async function processCallback(payload:any){                    // this is a  method & entry point
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
             amount,
             code
        } = payload;


        const user = await repo.findUserById(
            merchantCustomerId
        );
        const newstatus = mapGatewaycodetoStatus(code);

        if(!user){
            throw new Error ("user does not exist")
        }

        const existingtxn = await repo.findtransactionByGatewayId(  gatewayTransactionId);
        //idempotency
        if(existingtxn){
            {
                existingtxn.status == "SUCCESS";
            }
            return existingtxn;
        }

        
            
           if(!code){
            throw new Error("Gateway response code is mising");
           }
           if(status){
            
           
           
           
         
        }

        if(paymentmode === "COLLECT"){
               
        }

     return await repo.saveTransaction({
      gatewayTransactionId,
      amount,
      status: ,
      user,
    });
    }
    return {processCallback};


}




    




