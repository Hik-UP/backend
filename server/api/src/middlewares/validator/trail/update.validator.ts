import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  name: Joi.string().max(128),
  address: Joi.string().max(256),
  description: Joi.string().max(1024),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).max(16),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  difficulty: Joi.number().min(0).max(10),
  duration: Joi.number().min(0).max(9999),
  distance: Joi.number().min(0).max(9999),
  uphill: Joi.number().min(0).max(9999),
  downhill: Joi.number().min(0).max(9999),
  tools: Joi.array().items(Joi.string().max(256)).max(64),
  relatedArticles: Joi.array().items(Joi.string().uri().max(1024)).max(16),
  labels: Joi.array().items(Joi.string().max(32)).max(16),
  geoJSON: Joi.string().max(16384)
})
  .min(2)
  .required();

const update = Joi.object({
  user: authJOI.payload.required(),
  trail: trail.required()
}).required();

export { update };
