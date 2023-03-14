import { prisma } from '../../utils/prisma.util';
import { IUserSecrets } from '../../ts/user.type';
import { dbUserSelector } from './selector.model';

async function findSecrets(email: string): Promise<IUserSecrets | null> {
  return await prisma.user.findUnique({
    where: {
      email: email
    },
    select: dbUserSelector.secrets
  });
}

export { findSecrets };
