import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  name: Joi.string().max(1024).required(),
  address: Joi.string().max(1024).required(),
  description: Joi.string().max(4096).required(),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).max(16).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  difficulty: Joi.number().min(0).max(10).required(),
  duration: Joi.number().min(0).max(9999).required(),
  distance: Joi.number().min(0).max(99999).required(),
  uphill: Joi.number().min(0).max(9999).required(),
  downhill: Joi.number().min(0).max(9999).required(),
  tools: Joi.array().items(Joi.string().max(256)).max(64).required(),
  relatedArticles: Joi.array()
    .items(Joi.string().uri().max(1024))
    .max(16)
    .required(),
  labels: Joi.array().items(Joi.string().max(256)).max(16).required(),
  geoJSON: Joi.string().max(16384).required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail
}).required();

export { create };
