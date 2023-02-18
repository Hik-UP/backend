import { prisma } from '../../utils/prisma.util';
import { IUserSecrets } from '../../ts/user.type';

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

export { findSecrets };
