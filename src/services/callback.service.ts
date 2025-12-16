
import { CallbackRepository } from "../repositories/callback.repository"




class CallbackService {
        callbackrepo:CallbackRepository;
    
    constructor() {
    this.callbackrepo = new CallbackRepository();
  }


    async processCallback(payload:any){  // this is a class method & entry point
        const{type} = payload;

        switch (type) {
            case "CUSTOMER_DEBITED_VIA_COLLECT":
                return this.handleCustomerDebitedViaCollect(payload);
                
            case "CUSTOMER_DEBITED_VIA_PAY":
                return this.hanndlerCustomerDebitedViaPay(payload)
        
            default:
                throw new Error ("invalid callback")
        }
    }

    // handlers 

    async handleCustomerDebitedViaCollect(payload:any){
     return this.createdebitTransaction(payload,"COLLECT")

    }

    async hanndlerCustomerDebitedViaPay(payload:any){
     return this.createdebitTransaction(payload,"PAY")
    }



    async createdebitTransaction(
        payload:any,
        paymentmode:"PAY"|"COLLECT"
       
    ){
        const {
             merchantCustomerId,
             gatewayTransactionId ,
             amount
        } = payload;

        const user = await this.callbackrepo.findUserById(
            merchantCustomerId
        );

        if(!user){
            throw new Error ("user does not exist")
        }

        const existingtxn = await this.callbackrepo.findtransactionByGatewayId(  gatewayTransactionId);

        if(existingtxn){
            return existingtxn;
        }

        if(paymentmode==="PAY"){

        }

        if(paymentmode === "COLLECT"){
            
        }

     return await this.callbackrepo.saveTransaction({
      gatewayTransactionId,
      amount,
      status: "SUCCESS",
      user,
    });
}
}




    




export default new CallbackService();