import { prisma } from '../../../utils/prisma.util';
import { IUserToken } from '../../../ts/user.type';

function verify(token: IUserToken, reqToken: string): boolean {
  if (token.type === 1 && token.value === reqToken) {
    return true;
  } else {
    return false;
  }
}

async function success(userId: string, tokenId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: {
        delete: {
          id: tokenId
        }
      }
    }
  });
}

const type1 = {
  verify,
  success
};

export { type1 };
