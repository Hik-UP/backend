interface INewUser {
  username: string;
  email: string;
  password: string;
}

interface IUserSecrets {
  id: string;
  password: string;
}

export { INewUser, IUserSecrets };
