import {Request,Response,NextFunction} from "express";
import { callbackSchema  } from "../validations/paymentsschema.validation";

export const validate = (schema:any)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
      const {error}=callbackSchema.validate(req.body);

      if(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
      }
      next();

    }

};