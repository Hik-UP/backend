import { profile } from './profile.validator';
import { update } from './update.validator';
import { skin } from './skin/skin.validator';

const userJOI = {
  profile,
  update,
  skin
};

export { userJOI };
