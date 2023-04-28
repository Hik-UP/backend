import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { findOne } from './findOne.model';
import { comment } from './comment/comment.model';

const dbTrail = {
  create,
  retrieve,
  findOne,
  comment
};

export { dbTrail };
