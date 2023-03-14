import { prisma } from '../../../../utils/prisma.util';

async function refuse(userId: string, hikeId: string): Promise<void> {
  await prisma.hike.update({
    where: {
      id: hikeId
    },
    data: {
      guests: {
        disconnect: {
          id: userId
        }
      }
    }
  });
}

export { refuse };
