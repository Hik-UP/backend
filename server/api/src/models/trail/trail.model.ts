import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { update } from './update.model';
import { findOne } from './findOne.model';
import { comment } from './comment/comment.model';

const dbTrail = {
  create,
  retrieve,
  update,
  findOne,
  comment
};

export { dbTrail };
