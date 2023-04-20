import { create } from './create.controller';
import { retrieve } from './retrieve.controller';
import { details } from './details.controller';
import { comment } from './comment/comment.controller';

const trailCtrl = {
  create,
  retrieve,
  details,
  comment
};

export { trailCtrl };
