import { retrieve } from './retrieve.validator';
import { update } from './update.validator';
import { remove } from './remove.validator';

const notification = {
  retrieve,
  update,
  remove
};

export { notification };
