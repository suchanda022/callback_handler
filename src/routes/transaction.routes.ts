import {Router}   from "express";
import { validate} from "../middleware/validate";
import { callbackSchema } from "../validations/paymentsschema.validation"; 

const router = Router();

router.post("/callback",
            validate(callbackSchema),
            

)