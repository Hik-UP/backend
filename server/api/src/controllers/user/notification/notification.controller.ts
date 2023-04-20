import { retrieve } from './retrieve.controller';
import { update } from './update.controller';
import { remove } from './remove.controller';

const notification = {
  retrieve,
  update,
  remove
};

export { notification };
