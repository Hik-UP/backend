import Joi from 'joi';

const user = Joi.object({
  email: Joi.string().email().max(256).required(),
  password: Joi.string().min(8).max(128).required()
}).required();

const login = Joi.object({
  user: user
}).required();

export { login };
