import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,Check, Unique,  CreateDateColumn} from "typeorm";
import {Users} from "./User";
//@Entity()
@Check(`"amount" > 0`)
@Check(`"status" IN('pending',"success","failed")`)
@Unique([`gateway_transaction_id` ])
export class Transaction {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    gateway_transaction_id:string;
    @Column()
    payee_vpa: string;

    @Column()
    payer_vpa: string;

    @Column()
    payee_name : string;

    @Column()
    payer_name : string;

    @Column()
    amount:number;

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
