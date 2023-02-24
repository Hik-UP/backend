import { profile } from './profile.controller';
import { update } from './update.controller';
import { skin } from './skin/skin.controller';
import { hike } from './hike/hike.controller';

const userCtrl = {
  profile,
  update,
  skin,
  hike
};

export { userCtrl };
