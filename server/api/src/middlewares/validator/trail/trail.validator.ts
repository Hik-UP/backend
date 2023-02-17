import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { details } from './details.validator';

const trailJOI = {
  create,
  retrieve,
  details
};

export { trailJOI };
