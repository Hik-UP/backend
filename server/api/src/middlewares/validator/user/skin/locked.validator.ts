import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const locked = Joi.object({
  user: authJOI.payload
}).required();

export { locked };
