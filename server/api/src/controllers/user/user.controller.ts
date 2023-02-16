import { profile } from './profile.controller';
import { skin } from './skin/skin.controller';
import { updateProfile } from './updateProfile.controller';

const userCtrl = {
  profile,
  skin,
  updateProfile
};

export { userCtrl };
