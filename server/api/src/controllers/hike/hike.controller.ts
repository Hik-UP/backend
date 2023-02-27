import { create } from './create.controller';
import { retrieve } from './retrieve.controller';
import { update } from './update.controller';
import { leave } from './leave.controller';
import { remove } from './remove.controller';

const hikeCtrl = {
  create,
  retrieve,
  update,
  leave,
  remove
};

export { hikeCtrl };
