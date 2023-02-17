import Joi from 'joi';

const user = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
}).required();

const signup = Joi.object({
  user: user
});

export { signup };
