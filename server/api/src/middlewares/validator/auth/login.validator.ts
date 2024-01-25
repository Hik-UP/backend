import Joi from 'joi';

const user = Joi.object({
  email: Joi.string().max(256).required(),
  password: Joi.string().min(8).max(128).required()
}).required();

const verify = Joi.object({
  token: Joi.string().min(6).max(6).alphanum().required()
});

const login = Joi.object({
  user: user,
  verify: verify
}).required();

export { login };
