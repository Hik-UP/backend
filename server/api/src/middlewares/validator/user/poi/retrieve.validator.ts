import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const poi = Joi.object({
  target: Joi.array()
    .items(Joi.string().min(5).max(9).valid('created', 'shared'))
    .min(1)
    .max(2)
    .required()
}).required();

const retrieve = Joi.object({
  user: authJOI.payload.required(),
  poi: poi.required()
}).required();

export { retrieve };
