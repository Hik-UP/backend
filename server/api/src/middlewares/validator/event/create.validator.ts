import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const event = Joi.object({
  title: Joi.string().max(128).required(),
  description: Joi.string().max(1024).required(),
  coverUrl: Joi.string().uri().max(1024).required(),
  invitedUser: Joi.array().items(Joi.string().uri().max(256)),
  tags: Joi.array().items(Joi.string().max(10)).required(),
  localisation: Joi.string().max(1024).required(),
  nbrParticipants: Joi.number(),
  visibilityEvent: Joi.allow('PRIVATE', 'PUBLIC')
}).required();

const create = Joi.object({
  user: authJOI.payload,
  event: event
}).required();

export { create };
