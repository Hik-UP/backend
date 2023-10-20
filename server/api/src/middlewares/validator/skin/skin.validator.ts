import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { updateCurrentSkin } from './updateCurrentSkin.validator';
import { unlock } from './unlock';

const skinJOI = {
  create,
  retrieve,
  updateCurrentSkin,
  unlock
};

export { skinJOI };
