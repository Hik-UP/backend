import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { update } from './update.validator';

const hikeJOI = {
  create,
  retrieve,
  update
};

export { hikeJOI };
