import { findOne } from './findOne.model';
import { create } from './create.model';
import { remove } from './remove.model';
import { update } from './update.model';

const tokens = {
  create,
  remove,
  findOne,
  update
};

export { tokens };
