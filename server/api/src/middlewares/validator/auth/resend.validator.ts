import Joi from 'joi';

const user = Joi.object({
  email: Joi.string().max(256).required()
}).required();

const token = Joi.object({
  type: Joi.number().min(0).max(2).required()
}).required();

const resend = Joi.object({
  user: user.required(),
  token: token.required()
}).required();

export { resend };
