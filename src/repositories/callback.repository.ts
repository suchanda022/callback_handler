import { Users} from "../entities/User";
import { Transaction} from "../entities/Transaction";
import { AppDataSource } from "../config/data-source";
import { Code, DeepPartial } from "typeorm";
import { error } from "console";


export   function CallbackRepository(){
    const userRepo = AppDataSource.getRepository(Users);  // returning an object
    const transactionRepo = AppDataSource.getRepository(Transaction);

    async function findUserById(id:number){
        return userRepo.findOne({where:{id}});
    }
    async function findtransactionByGatewayId(gatewayTransactionId:string){
        return transactionRepo.findOne({where:{ gatewayTransactionId}} )
    }

    //async saveTransaction(txn:Transaction){
    //    return this.transactionRepo.save(txn);
    //}

    async function saveTransaction(data: DeepPartial<Transaction>) {

      if(!data.gatewayTransactionId){
        throw new Error ("gatewaytransactionId is required");    // this eliminates the error which deepartial creates by allowing all fields not to be mandatory which creates problem in (where: {gatewayTransactionId: data.gatewayTransactionId}) here , conflicts with typescript 
      }
      try {
        const transaction = transactionRepo.create(); // create does not touch db , only js object in memory

        return await transactionRepo.save(transaction);
        
      } catch (error) {
        if(error === "23505"){  
          return transactionRepo.findOne({
            where: {gatewayTransactionId: data.gatewayTransactionId}
          });
        }
        throw error;
        
      }

  }
    return {
    findUserById,
    findtransactionByGatewayId,
    saveTransaction,
  };  // without this CallbackRepository this func will return undefined by default
}