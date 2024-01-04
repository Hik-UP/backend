import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { findOne } from './findOne.model';
import { findAttendees } from './findAttendees';
import { isUserInHike } from './isUserInHike.model';
import { organizer } from './organizer/organizer.model';
import { attendee } from './attendee/attendee.model';
import { guest } from './guest/guest.model';
import { coins } from './coins/coins.model';
import { stats } from './stats/stats.model';

const hike = {
  create,
  retrieve,
  update,
  findOne,
  findAttendees,
  isUserInHike,
  organizer,
  attendee,
  guest,
  coins,
  stats
};

export { hike };
