import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,Check, Unique,  CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Users} from "./User";
@Entity()
@Check(`"amount" > 0`)
@Check(`"status" IN('SUCCESS','FAILED','PENDING',)`)
@Unique([`gatewayTransactionId`])

  export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gatewayTransactionId: string;

  @Column({ name: "payee_vpa" })
  payeeVpa: string;

  @Column({ name: "payer_vpa" })
  payerVpa: string;

  @Column({ name: "payee_name" })
  payeeName: string;

  @Column({ name: "payer_name" })
  payerName: string;

  @Column()
  amount: number;

  @Column()
    status:string;

  @Column()
    gateway_transaction_code:string; 

 //@Column("jsonb",{nullable:true})
    meta: any;
 @Column()
 typeofcb : string 

 @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date;
 @UpdateDateColumn({type: "timestamp with time zone"})
   updated_at:Date;

 @ManyToOne(()=> Users,(user)=> user.transactions)
    user:Users;
}
