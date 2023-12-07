import { prisma } from '../../../../utils/prisma.util';

async function get(
  userId: string,
  hikeId: string,
  coinId: string
): Promise<void> {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      coins: {
        increment: 1
      }
    }
  });
  await prisma.hike.update({
    where: {
      id: hikeId
    },
    data: {
      coins: {
        delete: {
          id: coinId
        }
      },
      stats: {
        updateMany: {
          where: {
            userId: userId
          },
          data: {
            coins: {
              increment: 1
            }
          }
        }
      }
    }
  });
}

export { get };
