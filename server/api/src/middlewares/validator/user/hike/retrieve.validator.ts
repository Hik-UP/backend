import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const hike = Joi.object({
  target: Joi.array()
    .items(Joi.string().valid('organized', 'attendee', 'leaved', 'guest'))
    .min(1)
    .max(4)
    .required()
}).required();

const retrieve = Joi.object({
  user: authJOI.payload.required(),
  hike: hike.required()
}).required();

export { retrieve };
