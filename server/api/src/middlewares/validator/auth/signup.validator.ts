import Joi from 'joi';

const user = Joi.object({
  username: Joi.string().min(8).max(24).required(),
  email: Joi.string().email().min(16).max(256).required(),
  password: Joi.string().min(8).max(128).required()
}).required();

const signup = Joi.object({
  user: user
});

export { signup };
