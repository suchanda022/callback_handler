import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "../entities/User";
import { Transaction } from "../entities/Transaction";

 export const AppDataSource = new DataSource({
    type:"postgres",
    host: process.env.DB_HOST!,    // mandatory to add "!" , typeorm understands string or not defined , tyepscript understands string or undefined 
    // it is to assure the typeorm it wont be not defined
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS! ,
    database: process.env.DB_NAME!,
    synchronize:true,
    logging:true,
    entities: [User,Transaction]


});

