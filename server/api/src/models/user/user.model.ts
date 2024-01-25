import { create } from './create.model';
import { findOne } from './findOne.model';
import { findSecrets } from './findSecrets.model';
import { update } from './update.model';
import { verify } from './verify.model';
import { notification } from './notification/notification.model';
import { skin } from './skin/skin.model';
import { hike } from './hike/hike.model';
import { poi } from './poi/poi.model';

const dbUser = {
  create,
  findOne,
  findSecrets,
  update,
  verify,
  notification,
  skin,
  hike,
  poi
};

export { dbUser };
