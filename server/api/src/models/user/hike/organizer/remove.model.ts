import { prisma } from '../../../../utils/prisma.util';

async function remove(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      organizerHikes: {
        delete: {
          id: hikeId
        }
      }
    }
  });
}

export { remove };
