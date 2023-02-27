import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { update } from './update.validator';
import { leave } from './leave.validator';
import { remove } from './remove.validator';

const hikeJOI = {
  create,
  retrieve,
  update,
  leave,
  remove
};

export { hikeJOI };
