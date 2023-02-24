import { profile } from './profile.validator';
import { update } from './update.validator';
import { skin } from './skin/skin.validator';
import { hike } from './hike/hike.validator';

const userJOI = {
  profile,
  update,
  skin,
  hike
};

export { userJOI };
