import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToMany} from "typeorm";
import { Transaction } from "./Transaction";
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    mobile_number: string;

    @Column()
    name:string;

    @OneToMany(()=>Transaction,(txn) => txn.user)
    transactions:Transaction[];


}
