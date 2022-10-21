import { prisma } from './prisma';
import { NewUser, AuthSecrets } from './user.types';

async function create(newUser: NewUser): Promise<void> {
  await prisma.user.create({
    data: {
      email: newUser.email,
      password: newUser.password
    }
  });
}

async function findAuthSecrets(email: string): Promise<AuthSecrets | null> {
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

export { create, findAuthSecrets };
