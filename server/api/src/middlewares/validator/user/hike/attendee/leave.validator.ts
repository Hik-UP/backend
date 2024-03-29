import Joi from 'joi';

import { authJOI } from '../../../auth/auth.validator';

const hike = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const leave = Joi.object({
  user: authJOI.payload.required(),
  hike: hike.required()
}).required();

export { leave };
