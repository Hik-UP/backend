import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const notification = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  read: Joi.boolean()
});

const update = Joi.object({
  user: authJOI.payload.required(),
  notification: notification.min(2).required()
}).required();

export { update };
