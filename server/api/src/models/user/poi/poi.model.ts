import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { remove } from './remove.model';
import { isUserInPOI } from './isUserInPOI.model';

const poi = {
  create,
  retrieve,
  update,
  remove,
  isUserInPOI
};

export { poi };
