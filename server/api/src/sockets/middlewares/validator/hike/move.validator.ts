import Joi from 'joi';

const stats = Joi.object({
  steps: Joi.number().min(0).max(999999).required(),
  distance: Joi.number().min(0).max(99999).required(),
  completed: Joi.boolean().required()
}).required();

const hiker = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  stats: stats.required()
}).required();

const move = Joi.object({
  hiker: hiker.required()
}).required();

export { move };
