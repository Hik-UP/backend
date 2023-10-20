import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const updateCurrentSkin = Joi.object({
  user: authJOI.payload,
  skin: {
    id: Joi.string().required()
  }
}).required();

export { updateCurrentSkin };
