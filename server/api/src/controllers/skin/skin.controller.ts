import { create } from './create.controller';
import { retrieve } from './retrieve.controller';
import { updateCurrentSkin } from './updateCurrentSkin';
import { unlock } from './unlock';

const skinCtrl = {
  create,
  retrieve,
  updateCurrentSkin,
  unlock
};

export { skinCtrl };
