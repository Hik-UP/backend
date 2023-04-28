import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const notification = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const remove = Joi.object({
  user: authJOI.payload.required(),
  notification: notification.required()
}).required();

export { remove };
