import { ISkin } from './skin.type';

interface INewUser {
  username: string;
  email: string;
  token: string;
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
  isVerified: boolean;
  token: string | null;
  password: string;
  fcmToken: string;
}

interface IUserToken {
  type: number;
  value: string;
  email: string;
  creation: number;
}

interface IUpdateUserProfile {
  username?: string;
  email?: string;
  token?: string;
  picture?: string;
  fcmToken?: string;
  skinId?: string;
}

interface ISkinOwner {
  id: string;
  username: string;
}

export {
  INewUser,
  IUserProfile,
  IUserPublicProfile,
  IUserSecrets,
  IUserToken,
  IUpdateUserProfile,
  ISkinOwner
};
