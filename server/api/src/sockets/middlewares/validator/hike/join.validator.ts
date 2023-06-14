import Joi from 'joi';

const hike = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const hiker = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
}).required();

const join = Joi.object({
  hike: hike.required(),
  hiker: hiker.required()
}).required();

export { join };
