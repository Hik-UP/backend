import { retrieve } from './retrieve.model';
import { findOne } from './findOne.model';
import { isUserInHike } from './isUserInHike.model';
import { organizer } from './organizer/organizer.model';
import { attendee } from './attendee/attendee.model';
import { guest } from './guest/guest.model';

const hike = {
  retrieve,
  findOne,
  isUserInHike,
  organizer,
  attendee,
  guest
};

export { hike };
