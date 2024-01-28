import Joi from 'joi';

const user = Joi.object({
  email: Joi.string().max(256).required(),
  password: Joi.string().min(8).max(128)
}).required();

const verify = Joi.object({
  token: Joi.string().min(6).max(6).alphanum().required()
});

const reset = Joi.object({
  user: user.required(),
  verify: verify
}).required();

export { reset };
