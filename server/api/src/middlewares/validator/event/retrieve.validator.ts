import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const retrieve = Joi.object({
  user: authJOI.payload,
  event: { visibility: Joi.allow('PUBLIC', 'PRIVATE') }
}).required();

export { retrieve };
