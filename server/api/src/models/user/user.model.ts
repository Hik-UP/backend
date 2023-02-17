import { create } from './create.model';
import { findOne } from './findOne.model';
import { findSecrets } from './findSecrets.model';
import { skin } from './skin/skin.model';
import { update } from './update.model';

const dbUser = {
  create,
  findOne,
  findSecrets,
  skin,
  update
};

export { dbUser };
