import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const comment = Joi.object({
  body: Joi.string().min(1).max(2048).required(),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).max(16)
}).required();

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  comment: comment.required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail
}).required();

export { create };
