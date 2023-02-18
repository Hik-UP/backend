import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const unlocked = Joi.object({
  user: authJOI.payload
}).required();

export { unlocked };
