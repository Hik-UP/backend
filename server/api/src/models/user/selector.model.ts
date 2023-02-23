const privateProfile = {
  username: true,
  email: true,
  picture: true,
  skin: {
    select: {
      id: true,
      name: true,
      description: true,
      pictures: true,
      model: true
    }
  },
  roles: true
};

const publicProfile = {
  username: true,
  picture: true
};

const secrets = {
  id: true,
  password: true
};

const dbUserSelector = {
  privateProfile,
  publicProfile,
  secrets
};

export { dbUserSelector };
