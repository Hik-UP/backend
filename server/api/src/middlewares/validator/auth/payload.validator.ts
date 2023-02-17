import Joi from 'joi';

const payload = Joi.object({
  id: Joi.string().required(),
  roles: Joi.array().required()
}).required();

export { payload };
