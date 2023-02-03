import { prisma } from '../../utils/prisma.util';
import { INewUser, IUserSecrets } from '../../ts/user/data.type';

async function create(newUser: INewUser): Promise<void> {
  await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      picture: ''
    }
  });
}

async function findSecrets(email: string): Promise<IUserSecrets | null> {
  return await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      password: true
    }
  });
}

const dbUserData = {
  create,
  findSecrets
};

export { dbUserData };
