import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  name: Joi.string().min(8).max(128).required(),
  description: Joi.string().min(8).max(1024).required(),
  pictures: Joi.array()
    .items(Joi.string().uri().min(16).max(1024))
    .max(16)
    .required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  difficulty: Joi.number().min(0).max(10).required(),
  duration: Joi.number().min(0).max(9999).required(),
  distance: Joi.number().min(0).max(9999).required(),
  uphill: Joi.number().min(0).max(9999).required(),
  downhill: Joi.number().min(0).max(9999).required(),
  tools: Joi.array().items(Joi.string().min(4).max(256)).max(64).required(),
  relatedArticles: Joi.array()
    .items(Joi.string().uri().min(16).max(1024))
    .max(16)
    .required(),
  labels: Joi.array().items(Joi.string().min(4).max(32)).max(16).required(),
  geoJSON: Joi.string().min(4).max(16384).required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail
}).required();

export { create };
