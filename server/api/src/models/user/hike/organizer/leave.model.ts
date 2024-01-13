import { prisma } from '../../../../utils/prisma.util';

async function leave(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      attendeeHikes: {
        update: {
          where: {
            id: hikeId
          },
          data: {
            status: 'DONE'
          }
        },
        disconnect: {
          id: hikeId
        }
      },
      leavedHikes: {
        connect: {
          id: hikeId
        }
      }
    }
  });
}

export { leave };
