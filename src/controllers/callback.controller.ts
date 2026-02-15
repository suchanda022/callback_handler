import { Request, Response } from "express";
import createCallbackService  from "../services/callback.service";

export const  transactionCallbackController = async (req:Request,res:Response)=> {
 
 
    try {
      //  Request body is already validated by middleware
      const payload = req.body;

      //  Delegate to service
      const result = await createCallbackService.processCallback(payload);

      //  Respond to gateway
      return res.status(200).json({
        success: true,
        message: "Callback processed successfully",
        data: result,
      });

    } catch (error: any) {
      // Centralized error handling
      return res.status(200).json({
        success: false,
        message: error.message || "Callback processing failed",
      });
    }
  
}
