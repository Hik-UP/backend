import { create } from './create.model';
import { findOne } from './findOne.model';
import { findSecrets } from './findSecrets.model';
import { update } from './update.model';
import { skin } from './skin/skin.model';
import { hike } from './hike/hike.model';

const dbUser = {
  create,
  findOne,
  findSecrets,
  update,
  skin,
  hike
};

export { dbUser };
