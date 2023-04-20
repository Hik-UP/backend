import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const comment = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const remove = Joi.object({
  user: authJOI.payload.required(),
  comment: comment.required()
}).required();

export { remove };
