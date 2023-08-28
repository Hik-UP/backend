import { create } from './create.controller';
import { retrieve } from './retrieve.controller';
import { update } from './update.controller';
import { details } from './details.controller';
import { comment } from './comment/comment.controller';

const trailCtrl = {
  create,
  retrieve,
  update,
  details,
  comment
};

export { trailCtrl };
