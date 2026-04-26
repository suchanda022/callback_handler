import Joi from "joi";

export const callbackSchema = Joi.object({
  type: Joi.string()
    .valid(
      "CUSTOMER_DEBITED_VIA_COLLECT",
      "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_COLLECT",
      "CUSTOMER_DEBITED_VIA_PAY",
      "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_PAY"
    )
    .required(),

  amount: Joi.number().positive().required(),
  gatewayTransactionId: Joi.string().required(),
  merchantCustomerId: Joi.number().required(),
  payee_vpa: Joi.string().required(),
  payer_vpa: Joi.string().required(),
  payee_name: Joi.string().required(),
  payer_name: Joi.string().required(),
  response_code: Joi.string().required(),
});

export const createTransactionSchema = Joi.object({
  userid: Joi.number().required(),
  amount: Joi.number().positive().required(),
  flowType: Joi.string().valid("PAY", "COLLECT").required(),
  metadata: Joi.object().optional(),
});


