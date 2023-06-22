import express from 'express';
import eventCtrl from '../controllers/event/event.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { rolesCheck } from '../middlewares/rolesCheck.middleware';
import { eventJOI } from '../middlewares/validator/event/event.validator';
import { userJOI } from '../middlewares/validator/user/user.validator';

function createEventRoutes(): express.Router {
  const eventRoutes: express.Router = express.Router();

  eventRoutes.post(
    '/create',
    validator(eventJOI.create),
    rolesCheck(['USER']),
    eventCtrl.create
  );
  eventRoutes.post(
    '/retrieve',
    validator(eventJOI.retrieve),
    eventCtrl.retrieve
  );
  eventRoutes.post(
    '/participate',
    validator(userJOI.profile),
    rolesCheck(['USER']),
    eventCtrl.participate
  );
  return eventRoutes;
}

const eventRoutes: express.Router = createEventRoutes();

export default eventRoutes;
