import Joi from 'joi';

const user = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
}).required();

const login = Joi.object({
  user: user
});

export { login };
