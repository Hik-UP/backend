import { create } from './create.controller';
import { retrieve } from './retrieve.controller';
import { accept } from './accept.controller';
import { refuse } from './refuse.controller';

const hikeCtrl = {
  create,
  retrieve,
  accept,
  refuse
};

export { hikeCtrl };
