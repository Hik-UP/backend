import { prisma } from '../../utils/prisma.util';

async function verify(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      token: null
    }
  });
}

export { verify };
