import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  pictures: Joi.array().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  difficulty: Joi.number().required(),
  duration: Joi.number().required(),
  distance: Joi.number().required(),
  uphill: Joi.number().required(),
  downhill: Joi.number().required(),
  tools: Joi.array().required(),
  relatedArticles: Joi.array().required(),
  labels: Joi.array().required(),
  geoJSON: Joi.string().required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail
});

export { create };
