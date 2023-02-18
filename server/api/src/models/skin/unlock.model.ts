import { prisma } from '../../utils/prisma.util';

async function unlock(userId: string, skinId: string): Promise<void> {
  await prisma.skin.update({
    where: {
      id: skinId
    },
    data: {
      owners: {
        connect: {
          id: userId
        }
      }
    }
  });
}

export { unlock };
