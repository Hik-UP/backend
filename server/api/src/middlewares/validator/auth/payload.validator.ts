import Joi from 'joi';

const payload = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  roles: Joi.array().items(Joi.string().max(32)).min(1).max(10).required()
}).required();

export { payload };
