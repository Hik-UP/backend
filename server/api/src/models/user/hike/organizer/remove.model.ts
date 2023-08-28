import { prisma } from '../../../../utils/prisma.util';

async function remove(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      organizerHikes: {
        update: {
          where: {
            id: hikeId
          },
          data: {
            stats: {
              deleteMany: {
                hikeId: hikeId
              }
            }
          }
        },
        delete: {
          id: hikeId
        }
      }
    }
  });
}

export { remove };
