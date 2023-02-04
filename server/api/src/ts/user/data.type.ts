interface INewUser {
  username: string;
  email: string;
  password: string;
}

interface IUserProfile {
  roles: string[];
}

interface IUserSecrets {
  id: string;
  password: string;
}

export { INewUser, IUserProfile, IUserSecrets };
