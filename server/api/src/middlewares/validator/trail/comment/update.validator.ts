import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const comment = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  body: Joi.string().min(1).max(2048),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).max(16)
})
  .min(2)
  .required();

const update = Joi.object({
  user: authJOI.payload.required(),
  comment: comment.min(2).required()
}).required();

export { update };
