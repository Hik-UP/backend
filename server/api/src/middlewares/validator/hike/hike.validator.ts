import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { accept } from './accept.validator';
import { refuse } from './refuse.validator';

const hikeJOI = {
  create,
  retrieve,
  accept,
  refuse
};

export { hikeJOI };
