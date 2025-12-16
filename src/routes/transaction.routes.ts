import {Router}   from "express";
import { validate} from "../middleware/validate";
import { callbackSchema } from "../validations/paymentsschema.validation"; 
import transactionCallbackController
  from "../controllers/callback.controller";


const router = Router();

router.post("/callback",
            validate(callbackSchema),
            transactionCallbackController.handleCallback,

            

);
export default router;