interface NewUser {
  email: string;
  password: string;
}

interface AuthSecrets {
  id: string;
  password: string;
}

export { NewUser, AuthSecrets };
