import { Request, Response } from "express";
import callbackService from "../services/callback.service";

class transactionCallbackController {
    constructor() {
    this.handleCallback = this.handleCallback.bind(this);
  }
  async handleCallback(req: Request, res: Response) {
    try {
      //  Request body is already validated by middleware
      const payload = req.body;

      //  Delegate to service
      const result = await callbackService.processCallback(payload);

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
}

export default new transactionCallbackController();
