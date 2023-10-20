import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const unlock = Joi.object({
  user: authJOI.payload,
  skin: {
    id: Joi.string().required()
  }
}).required();

export { unlock };
