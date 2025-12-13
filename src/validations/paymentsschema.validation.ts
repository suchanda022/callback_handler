import Joi from "joi";

export const callbackSchema = Joi.object({
  type: Joi.string()
    .valid(
      "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_COLLECT" ,
      "CUSTOMER_DEBITED_FOR_MERCHANT_VIA_PAY",
      "CUSTOMER_DEBITED_VIA_COLLECT",
      "CUSTOMER_DEBITED_VIA_PAY"
    )
    .required(),

  amount: Joi.number().required(),
  gatewayTransactionId: Joi.string().required(),
  merchantCustomerId: Joi.number().required(),

  code: Joi.string().when("type", {
    is: Joi.valid("customer_debited", "customer_via_collect"),
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});


