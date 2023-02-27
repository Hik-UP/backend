import { retrieve } from './retrieve.controller';
import { organizer } from './organizer/organizer.controller';
import { attendee } from './attendee/attendee.controller';
import { guest } from './guest/guest.controller';

const hike = {
  retrieve,
  organizer,
  attendee,
  guest
};

export { hike };
