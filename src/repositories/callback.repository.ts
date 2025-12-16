import { Users} from "../entities/User";
import { Transaction} from "../entities/Transaction";
import { AppDataSource } from "../config/data-source";
import { DeepPartial } from "typeorm";


export   class CallbackRepository{
    private userRepo = AppDataSource.getRepository(Users);  // returning an object
    private transactionRepo = AppDataSource.getRepository(Transaction);

    async findUserById(id:number){
        return this.userRepo.findOne({where:{id}});
    }
    async findtransactionByGatewayId(gatewayTransactionId:string){
        return this.transactionRepo.findOne({where:{ gatewayTransactionId}})
    }

    //async saveTransaction(txn:Transaction){
    //    return this.transactionRepo.save(txn);
    //}

    async saveTransaction(data: DeepPartial<Transaction>) {
    const transaction = this.transactionRepo.create(data);
    return this.transactionRepo.save(transaction);
  }
}