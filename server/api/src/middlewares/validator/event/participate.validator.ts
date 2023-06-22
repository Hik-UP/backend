import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const participate = Joi.object({
  user: authJOI.payload,
  event: { id: Joi.string().required() }
}).required();

export { participate };
