import { prisma } from '../../../utils/prisma.util';

async function remove(userId: string, poiId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      pointOfInterests: {
        delete: {
          id: poiId
        }
      }
    }
  });
}

export { remove };
