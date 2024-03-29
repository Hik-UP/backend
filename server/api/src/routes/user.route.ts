import express from 'express';

import { userCtrl } from '../controllers/user/user.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { userJOI } from '../middlewares/validator/user/user.validator';

function createUserRoutes(): express.Router {
  const userRoutes: express.Router = express.Router();

  userRoutes.post('/profile', validator(userJOI.profile), userCtrl.profile);
  userRoutes.put('/profile/update', validator(userJOI.update), userCtrl.update);
  userRoutes.post('/check', validator(userJOI.check), userCtrl.check);

  userRoutes.post(
    '/notification/retrieve',
    validator(userJOI.notification.retrieve),
    userCtrl.notification.retrieve
  );
  userRoutes.put(
    '/notification/update',
    validator(userJOI.notification.update),
    userCtrl.notification.update
  );
  userRoutes.delete(
    '/notification/remove',
    validator(userJOI.notification.remove),
    userCtrl.notification.remove
  );

  userRoutes.post(
    '/skin/locked',
    validator(userJOI.skin.locked),
    userCtrl.skin.locked
  );
  userRoutes.post(
    '/skin/unlocked',
    validator(userJOI.skin.unlocked),
    userCtrl.skin.unlocked
  );

  userRoutes.post(
    '/hike/create',
    validator(userJOI.hike.create),
    userCtrl.hike.create
  );
  userRoutes.post(
    '/hike/retrieve',
    validator(userJOI.hike.retrieve),
    userCtrl.hike.retrieve
  );

  userRoutes.put(
    '/hike/organizer/update',
    validator(userJOI.hike.organizer.update),
    userCtrl.hike.organizer.update
  );
  userRoutes.put(
    '/hike/organizer/leave',
    validator(userJOI.hike.organizer.leave),
    userCtrl.hike.organizer.leave
  );
  userRoutes.delete(
    '/hike/organizer/remove',
    validator(userJOI.hike.organizer.remove),
    userCtrl.hike.organizer.remove
  );

  userRoutes.put(
    '/hike/attendee/leave',
    validator(userJOI.hike.attendee.leave),
    userCtrl.hike.attendee.leave
  );
  userRoutes.delete(
    '/hike/attendee/remove',
    validator(userJOI.hike.attendee.remove),
    userCtrl.hike.attendee.remove
  );

  userRoutes.put(
    '/hike/guest/accept',
    validator(userJOI.hike.guest.accept),
    userCtrl.hike.guest.accept
  );
  userRoutes.put(
    '/hike/guest/refuse',
    validator(userJOI.hike.guest.refuse),
    userCtrl.hike.guest.refuse
  );

  userRoutes.post(
    '/poi/create',
    validator(userJOI.poi.create),
    userCtrl.poi.create
  );
  userRoutes.post(
    '/poi/retrieve',
    validator(userJOI.poi.retrieve),
    userCtrl.poi.retrieve
  );
  userRoutes.put(
    '/poi/update',
    validator(userJOI.poi.update),
    userCtrl.poi.update
  );
  userRoutes.delete(
    '/poi/remove',
    validator(userJOI.poi.remove),
    userCtrl.poi.remove
  );
  return userRoutes;
}

const userRoutes: express.Router = createUserRoutes();

export { userRoutes };
