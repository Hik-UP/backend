import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { update } from './update.validator';
import { details } from './details.validator';
import { comment } from './comment/comment.validator';

const trailJOI = {
  create,
  retrieve,
  update,
  details,
  comment
};

export { trailJOI };
