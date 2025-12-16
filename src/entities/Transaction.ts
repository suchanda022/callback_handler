import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,Check, Unique,  CreateDateColumn} from "typeorm";
import {Users} from "./User";
//@Entity()
@Check(`"amount" > 0`)
@Check(`"status" IN('pending',"success","failed")`)
@Unique([` gatewayTransactionId` ])

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

 @Column("jsonb",{nullable:true})
    meta: any;

 @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date;

 @ManyToOne(()=> Users,(user)=> user.transactions)
    user:Users;
}
