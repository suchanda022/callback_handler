import { Users} from "../entities/User";
import { Transaction} from "../entities/Transaction";
import { AppDataSource } from "../config/data-source";
import { DeepPartial } from "typeorm";


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
    const transaction = transactionRepo.create(data);
    return transactionRepo.save(transaction);
  }
    return {
    findUserById,
    findtransactionByGatewayId,
    saveTransaction,
  };  // without this CallbackRepository this func will return undefined by default
}