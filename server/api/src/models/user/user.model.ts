import { create } from './create.model';
import { findOne } from './findOne.model';
import { findSecrets } from './findSecrets.model';
import { update } from './update.model';
import { isExisting } from './isExisting.model';
import { secrets } from './secrets/secrets.model';
import { tokens } from './tokens/tokens.model';
import { notification } from './notification/notification.model';
import { skin } from './skin/skin.model';
import { hike } from './hike/hike.model';
import { poi } from './poi/poi.model';

const dbUser = {
  create,
  findOne,
  findSecrets,
  update,
  isExisting,
  secrets,
  tokens,
  notification,
  skin,
  hike,
  poi
};

export { dbUser };
