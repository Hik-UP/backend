import { create } from './create.model';
import { retrieve } from './retrieve.model';
import { unlock } from './unlock.model';
import { retrieveSkinWithId } from './retrieveSkinWithId.model';

const dbSkin = {
  create,
  retrieve,
  unlock,
  retrieveSkinWithId
};

export { dbSkin };
