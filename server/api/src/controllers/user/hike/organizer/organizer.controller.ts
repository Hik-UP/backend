import { update } from './update.controller';
import { leave } from './leave.controller';
import { remove } from './remove.controller';

const organizer = {
  update,
  leave,
  remove
};

export { organizer };
