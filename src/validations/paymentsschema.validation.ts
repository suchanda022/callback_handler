import Joi from "joi";

export const callbackSchema = Joi.object({
  type: Joi.string()
    .valid(
      "CUSTOMER_DEBITED_VIA_COLLECT",
      "CUSTOMER_DEBITED_VIA_PAY"
    )
    .required(),

  amount: Joi.number().required(),
  gatewayTransactionId: Joi.string().required(),
  merchantCustomerId: Joi.number().required(),
  payee_vpa: Joi.string().required(),
  payer_vpa: Joi.string().required(),
  payee_name: Joi.string().required(),
  payer_name: Joi.string().required(),

  response_code: Joi.string().when("type", {
    is: Joi.valid("customer_debited", "customer_via_collect"),
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});


