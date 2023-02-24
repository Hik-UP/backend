import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { isUserInHike } from './isUserInHike.model';

const dbHike = {
  create,
  retrieve,
  update,
  isUserInHike
};

export { dbHike };
