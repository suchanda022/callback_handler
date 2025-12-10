import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,Check} from "typeorm";
import {User} from "./User";
//@Entity()
@Check(`"amount" > 0`)
@Check(`"status" IN('pending',"sucess","failed")`)
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

    @ManyToOne(()=> User,(user)=> user.transactions)
    user:User;
}
