import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const profile = Joi.object({
  user: authJOI.payload
});

export { profile };
