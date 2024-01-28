import { ISkin } from './skin.type';

interface INewUser {
  username: string;
  email: string;
  token: INewUserToken;
  password: string;
}

interface INewUserToken {
  type: number;
  value: string;
  store: string | null;
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
  tokens: IUserToken[];
  password: string;
  fcmToken: string;
}

interface IUserToken {
  id: string;
  type: number;
  value: string;
  email: string;
  store: string | null;
  createdAt: Date;
}

interface IUpdateUserProfile {
  username?: string;
  email?: string;
  picture?: string;
  fcmToken?: string;
  skinId?: string;
}

interface IUpdateUserSecrets {
  password?: string;
}

interface ISkinOwner {
  id: string;
  username: string;
}

export {
  INewUser,
  INewUserToken,
  IUserProfile,
  IUserPublicProfile,
  IUserSecrets,
  IUserToken,
  IUpdateUserProfile,
  IUpdateUserSecrets,
  ISkinOwner
};
