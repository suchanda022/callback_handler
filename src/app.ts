import dotenv from "dotenv" 
dotenv.config();
import express,{Application,Request,Response} from 'express';
import { AppDataSource } from "./config/data-source";


const app:Application= express();
const port:number = 3000 ;

AppDataSource.initialize()
.then(()=>{
    console.log("postgress DB connected");

})
.catch((err) => console.error("DB connection Error:",err));

app.get('/',(req:Request,res:Response)=>{
    res.send("hello world");
})

app.listen(port , ()=>{
    console.log(`connected successfully on port ${port}`)
})
