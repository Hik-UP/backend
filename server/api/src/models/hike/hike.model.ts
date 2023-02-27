import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { leave } from './leave.model';
import { remove } from './remove.model';
import { findOne } from './findOne.model';
import { isUserInHike } from './isUserInHike.model';

const dbHike = {
  create,
  retrieve,
  update,
  leave,
  remove,
  findOne,
  isUserInHike
};

export { dbHike };
