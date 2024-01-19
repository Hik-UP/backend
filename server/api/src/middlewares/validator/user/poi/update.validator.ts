import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const poi = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  name: Joi.string().max(128),
  description: Joi.string().max(1024),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).max(16),
  sharedWith: Joi.object({
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
  }).min(1)
})
  .min(2)
  .required();

const update = Joi.object({
  user: authJOI.payload.required(),
  poi: poi.required()
}).required();

export { update };
