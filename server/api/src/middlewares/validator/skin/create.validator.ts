import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const skin = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  pictures: Joi.array().required(),
  model: Joi.string().required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  skin: skin
});

export { create };
