import { Users} from "../entities/User";
import { Transaction} from "../entities/Transaction";
import { AppDataSource } from "../config/data-source";
import {  DeepPartial } from "typeorm";



export   function CallbackRepository(){
    const userRepo = AppDataSource.getRepository(Users);  // returning an object
    const transactionRepo = AppDataSource.getRepository(Transaction);

    async function findUserById(userid:number){
        return userRepo.findOne({where:{userid}});
    }
    async function findTransactionByGatewayId(gatewayTransactionId:string){
        return transactionRepo.findOne({where:{ gatewayTransactionId}} )
    }

    //async saveTransaction(txn:Transaction){
    //    return this.transactionRepo.save(txn);
    //}

    async function saveTransaction(data: DeepPartial<Transaction>) {

      if(!data.gatewayTransactionId){
        throw new Error ("gatewayTransactionId is required");    // this eliminates the error which deepartial creates by allowing all fields not to be mandatory which creates problem in (where: {gatewayTransactionId: data.gatewayTransactionId}) here , conflicts with typescript 
      }
      try {
        const transaction = transactionRepo.create(data); // create does not touch db , only js object in memory

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
    findTransactionByGatewayId,
    saveTransaction,
  };  // without this CallbackRepository this func will return undefined by default
}