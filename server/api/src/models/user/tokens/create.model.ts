import { prisma } from '../../../utils/prisma.util';
import { INewUserToken } from '../../../ts/user.type';

async function create(userId: string, token: INewUserToken): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: {
        deleteMany: {
          type: token.type
        },
        create: token
      }
    }
  });
}

export { create };
