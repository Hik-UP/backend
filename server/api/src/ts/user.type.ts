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

interface IUserPublicProfile {
  username: string;
  picture: string;
}

interface IUserSecrets {
  id: string;
  password: string;
  fcmToken: string;
}

interface IUpdateUserProfile {
  username?: string;
  email?: string;
  picture?: string;
  fcmToken?: string;
}

export {
  INewUser,
  IUserProfile,
  IUserPublicProfile,
  IUserSecrets,
  IUpdateUserProfile
};
