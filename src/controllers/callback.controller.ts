import { Request, Response } from "express";
import callbackService from "../services/callback.service";

class TransactionCallbackController {
  async handleCallback(req: Request, res: Response) {
    try {
      // 1️⃣ Request body is already validated by middleware
      const payload = req.body;

      // 2️⃣ Delegate to service
      const result = await callbackService.processCallback(payload);

      // 3️⃣ Respond to gateway
      return res.status(200).json({
        success: true,
        message: "Callback processed successfully",
        data: result,
      });

    } catch (error: any) {
      // 4️⃣ Centralized error handling
      return res.status(400).json({
        success: false,
        message: error.message || "Callback processing failed",
      });
    }
  }
}

export default new TransactionCallbackController();
