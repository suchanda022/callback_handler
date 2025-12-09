import Joi from "joi";

export const callbackSchema = Joi.object({
  type: Joi.string()
    .valid(
      "customer_debited",
      "customer_via_collect",
      "collect_request_sent",
      "collect_request_expired"
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


