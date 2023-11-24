import { prisma } from '../../../../utils/prisma.util';

async function remove(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      attendeeHikes: {
        disconnect: {
          id: hikeId
        }
      },
      leavedHikes: {
        disconnect: {
          id: hikeId
        }
      },
      stats: {
        deleteMany: {
          hikeId: hikeId
        }
      }
    }
  });
}

export { remove };
