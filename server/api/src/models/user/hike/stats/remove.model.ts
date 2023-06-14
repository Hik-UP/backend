import { prisma } from '../../../../utils/prisma.util';

async function remove(userEmail: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      stats: {
        deleteMany: {
          hikeId: hikeId
        }
      }
    }
  });
}

export { remove };
