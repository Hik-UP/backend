import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const hike = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  name: Joi.string().min(8).max(128),
  description: Joi.string().min(8).max(1024),
  attendees: Joi.object({
    remove: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().email().min(16).max(256)
        })
      )
      .max(64)
  }).min(1),
  guests: Joi.object({
    add: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().email().min(16).max(256)
        })
      )
      .max(64),
    remove: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().email().min(16).max(256)
        })
      )
      .max(64)
  }).min(1),
  schedule: Joi.date().timestamp('unix').greater('now')
}).min(2);

const update = Joi.object({
  user: authJOI.payload.required(),
  trail: Joi.object({
    id: Joi.string().min(36).max(36).required()
  }),
  hike: hike
}).required();

export { update };
