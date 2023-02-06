import { prisma } from '../utils/prisma.util';

async function removeUser(email: string): Promise<void> {
  await prisma.user.delete({
    where: {
      email: email
    }
  });
}

async function setUserAdmin(email: string): Promise<void> {
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      roles: ['USER', 'ADMIN']
    }
  });
}

const dbTest = {
  removeUser,
  setUserAdmin
};

export { dbTest };
