import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const poi = Joi.object({
  name: Joi.string().min(8).max(128).required(),
  description: Joi.string().min(8).max(1024).required(),
  pictures: Joi.array().items(Joi.string().uri().min(16).max(1024)).max(16),
  sharedWith: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().max(256)
      })
    )
    .max(64),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
}).required();

const create = Joi.object({
  user: authJOI.payload.required(),
  trail: trail.required(),
  poi: poi.required()
}).required();

export { create };
