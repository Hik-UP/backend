import Joi from 'joi';

const payload = Joi.object({
  token: Joi.string().max(8192).required(),
  id: Joi.string().min(36).max(36).required(),
  roles: Joi.string().min(4).max(128).required()
}).required();

export { payload };
