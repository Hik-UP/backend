import { prisma } from '../utils/prisma.util';
import { IUserToken } from '../ts/user.type';

function token(userToken: IUserToken, reqToken: string): boolean {
  if (userToken.value === reqToken) {
    return true;
  } else {
    return false;
  }
}

async function success(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      token: null
    }
  });
}

const verify = {
  token,
  success
};

export { verify };
