import { prisma } from '../../../../utils/prisma.util';

async function accept(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      guestHikes: {
        update: {
          where: {
            id: hikeId
          },
          data: {
            attendees: {
              connect: {
                id: userId
              }
            }
          }
        },
        disconnect: {
          id: hikeId
        }
      }
    }
  });
}

export { accept };
