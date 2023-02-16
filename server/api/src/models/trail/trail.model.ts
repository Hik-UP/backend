import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { findOne } from './findOne.model';

const dbTrail = {
  create,
  retrieve,
  findOne
};

export { dbTrail };
