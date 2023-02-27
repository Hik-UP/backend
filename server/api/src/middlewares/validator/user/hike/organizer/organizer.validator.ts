import { create } from './create.validator';
import { update } from './update.validator';
import { remove } from './remove.validator';

const organizer = {
  create,
  update,
  remove
};

export { organizer };
