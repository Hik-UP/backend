import { prisma } from '../../utils/prisma.util';
import { INewUser, IUserProfile, IUserSecrets } from '../../ts/user/data.type';

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

async function findOne(id: string): Promise<IUserProfile | null> {
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      username: true,
      email: true,
      picture: true,
      roles: true
    }
  });
}

async function update(
  id: string,
  picture: string
): Promise<IUserProfile | null> {
  return await prisma.user.update({
    where: { id: id },
    data: {
      picture
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
  findOne,
  findSecrets,
  update
};

export { dbUserData };
