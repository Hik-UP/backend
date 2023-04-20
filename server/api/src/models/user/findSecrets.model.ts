import { prisma } from '../../utils/prisma.util';
import { IUserSecrets } from '../../ts/user.type';
import { dbUserSelector } from './selector.model';

async function findSecrets(user: {
  id?: string;
  email?: string;
}): Promise<IUserSecrets | null> {
  return await prisma.user.findUnique({
    where: user.id ? { id: user.id } : { email: user.email },
    select: dbUserSelector.secrets
  });
}

export { findSecrets };
