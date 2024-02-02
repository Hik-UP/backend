import { prisma } from '../../../utils/prisma.util';
import { IUserToken } from '../../../ts/user.type';

async function findOne(
  email: string,
  type: number
): Promise<IUserToken[] | null> {
  return await prisma.token.findMany({
    where: {
      AND: [
        {
          email: email,
          type: type
        }
      ]
    }
  });
}

export { findOne };
