import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import { AppDataSource } from "./config/data-source";
import transactionRoutes from "./routes/transaction.routes";

const app: Application = express();
const port = 3000;

// 
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

// routes
app.use("/domain/public/payment/v1", transactionRoutes);

// START SERVER ONLY AFTER DB READY
AppDataSource.initialize()
  .then(() => {
    console.log("Postgres DB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection Error:", err);
  });

