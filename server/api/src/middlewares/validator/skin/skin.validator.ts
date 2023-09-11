import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { updateCurrentSkin } from './updateCurrentSkin.validator';

const skinJOI = {
  create,
  retrieve,
  updateCurrentSkin
};

export { skinJOI };
