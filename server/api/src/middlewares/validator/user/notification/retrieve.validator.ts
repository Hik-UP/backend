import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const retrieve = Joi.object({
  user: authJOI.payload
}).required();

export { retrieve };
