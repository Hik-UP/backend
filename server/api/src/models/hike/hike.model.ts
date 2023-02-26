import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { remove } from './remove.model';
import { isUserInHike } from './isUserInHike.model';

const dbHike = {
  create,
  retrieve,
  update,
  remove,
  isUserInHike
};

export { dbHike };
