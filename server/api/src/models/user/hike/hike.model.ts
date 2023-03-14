import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { findOne } from './findOne.model';
import { isUserInHike } from './isUserInHike.model';
import { organizer } from './organizer/organizer.model';
import { attendee } from './attendee/attendee.model';
import { guest } from './guest/guest.model';

const hike = {
  create,
  retrieve,
  findOne,
  isUserInHike,
  organizer,
  attendee,
  guest
};

export { hike };
