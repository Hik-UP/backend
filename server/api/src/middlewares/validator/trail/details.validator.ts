import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  id: Joi.string().required(),
  roles: Joi.array().required(),
  weight: Joi.number().required(),
  tall: Joi.number().required(),
  sex: Joi.string().required(),
  age: Joi.number().required()
});

const trail = Joi.object({
  id: Joi.string().required()
});

const details = Joi.object({
  user: authJOI.payload.concat(user),
  trail: trail
});

export { details };
