import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { details } from './details.validator';
import { comment } from './comment/comment.validator';

const trailJOI = {
  create,
  retrieve,
  details,
  comment
};

export { trailJOI };
