import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const skin = Joi.object({
  name: Joi.string().max(128).required(),
  description: Joi.string().max(1024).required(),
  pictures: Joi.array().items(Joi.string().uri().max(1024)).required(),
  model: Joi.string().uri().max(1024).required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  skin: skin
}).required();

export { create };
