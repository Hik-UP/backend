import { prisma } from '../prisma.model';
import { INewUser, IUserSecrets } from '../../ts/user/data.type';

async function create(newUser: INewUser): Promise<void> {
  await prisma.user.create({
    data: {
      email: newUser.email,
      password: newUser.password
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
