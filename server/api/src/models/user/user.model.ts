import { create } from './create.model';
import { findOne } from './findOne.model';
import { findSecrets } from './findSecrets.model';
import { skin } from './skin/skin.model';
import { updateProfile } from './updatePofile.model';

const dbUserData = {
  create,
  findOne,
  findSecrets,
  skin,
  updateProfile
};

export { dbUserData };
