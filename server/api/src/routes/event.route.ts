import express from 'express';
import eventCtrl from '../controllers/event/event.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { eventJOI } from '../middlewares/validator/event/event.validator';

function createEventRoutes(): express.Router {
  const eventRoutes: express.Router = express.Router();

  eventRoutes.post('/create', validator(eventJOI.create), eventCtrl.create);
  eventRoutes.post(
    '/retrieve',
    validator(eventJOI.retrieve),
    eventCtrl.retrieve
  );
  eventRoutes.post(
    '/participate',
    validator(eventJOI.participate),

    eventCtrl.participate
  );
  eventRoutes.post(
    '/unparticipate',
    validator(eventJOI.participate),

    eventCtrl.unparticipate
  );
  return eventRoutes;
}

const eventRoutes: express.Router = createEventRoutes();

export default eventRoutes;
