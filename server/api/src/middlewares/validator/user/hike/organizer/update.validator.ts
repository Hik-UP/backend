import Joi from 'joi';

import { authJOI } from '../../../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required()
});

const hike = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  name: Joi.string().max(128),
  description: Joi.string().max(1024),
  attendees: Joi.object({
    remove: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().max(256)
        })
      )
      .max(10)
  }).min(1),
  guests: Joi.object({
    add: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().max(256)
        })
      )
      .max(10),
    remove: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().max(256)
        })
      )
      .max(10)
  }).min(1),
  schedule: Joi.date().timestamp('unix').greater('now')
})
  .min(2)
  .required();

const update = Joi.object({
  user: authJOI.payload.required(),
  trail: trail,
  hike: hike.required()
}).required();

export { update };
