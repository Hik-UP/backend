import { ISkin } from './skin.type';

interface INewUser {
  username: string;
  email: string;
  password: string;
}

interface IUserProfile {
  username: string;
  email: string;
  picture: string;
  skin: ISkin;
  roles: string[];
}

interface IUserSecrets {
  id: string;
  password: string;
}

interface IUpdateUserProfile {
  username?: string;
  email?: string;
  picture?: string;
}

export { INewUser, IUserProfile, IUserSecrets, IUpdateUserProfile };
