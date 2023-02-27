import { retrieve } from './retrieve.validator';
import { organizer } from './organizer/organizer.validator';
import { attendee } from './attendee/attendee.validator';
import { guest } from './guest/guest.validator';

const hike = {
  retrieve,
  organizer,
  attendee,
  guest
};

export { hike };
