import { create } from './create.validator';
import { retrieve } from './retrieve.validator';
import { participate } from './participate.validator';

const eventJOI = {
  create,
  retrieve,
  participate
};

export { eventJOI };
