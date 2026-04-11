import {Router}   from "express";
import { validate} from "../middleware/validate";
import { callbackSchema } from "../validations/paymentsschema.validation"; 
import {transactionCallbackController} from "../controllers/callback.controller";
import { createCtransactiononctroller } from "../controllers/createTransaction.controller";


const router = Router();

router.post("/callback",
            validate(callbackSchema),
             transactionCallbackController

            

);
router.post("/create-transaction", createCtransactiononctroller);
export default router;