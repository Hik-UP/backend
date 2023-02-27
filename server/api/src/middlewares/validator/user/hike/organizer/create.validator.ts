import Joi from 'joi';

import { authJOI } from '../../../auth/auth.validator';

const hike = Joi.object({
  name: Joi.string().min(8).max(128).required(),
  description: Joi.string().min(8).max(1024).required(),
  guests: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().min(16).max(256)
      })
    )
    .max(64),
  schedule: Joi.date().timestamp('unix').greater('now')
}).required();

const create = Joi.object({
  user: authJOI.payload.required(),
  trail: Joi.object({
    id: Joi.string().min(36).max(36).required()
  }).required(),
  hike: hike
}).required();

export { create };
