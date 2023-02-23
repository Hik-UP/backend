import { prisma } from '../../utils/prisma.util';

async function refuse(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      guestHikes: {
        disconnect: {
          id: hikeId
        }
      }
    }
  });
}

export { refuse };
