import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const hike = Joi.object({
  target: Joi.array()
    .items(Joi.string().min(5).max(9).valid('organized', 'attendee', 'guest'))
    .min(1)
    .max(3)
    .required()
}).required();

const retrieve = Joi.object({
  user: authJOI.payload.required(),
  hike: hike.required()
}).required();

export { retrieve };
