import { profile } from './profile.controller';
import { update } from './update.controller';
import { check } from './check.controller';
import { token } from './token/token.controller';
import { notification } from './notification/notification.controller';
import { skin } from './skin/skin.controller';
import { hike } from './hike/hike.controller';
import { poi } from './poi/poi.controller';

const userCtrl = {
  profile,
  update,
  check,
  token,
  notification,
  skin,
  hike,
  poi
};

export { userCtrl };
