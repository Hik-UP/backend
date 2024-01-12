import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const hike = Joi.object({
  name: Joi.string().max(128).required(),
  description: Joi.string().max(1024).required(),
  guests: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().max(256)
      })
    )
    .max(10),
  schedule: Joi.date().timestamp('unix')
}).required();

const create = Joi.object({
  user: authJOI.payload.required(),
  trail: trail.required(),
  hike: hike.required()
}).required();

export { create };
