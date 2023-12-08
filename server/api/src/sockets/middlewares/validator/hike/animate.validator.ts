import Joi from 'joi';

const hiker = Joi.object({
    skinState: Joi.number().min(0).max(7).required(),
}).required();

const animate = Joi.object({
  hiker: hiker.required()
}).required();

export { animate };
