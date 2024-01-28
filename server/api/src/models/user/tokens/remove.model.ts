import { prisma } from '../../../utils/prisma.util';

async function remove(userId: string, tokenId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      tokens: {
        delete: {
          id: tokenId
        }
      }
    }
  });
}

export { remove };
