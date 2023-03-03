import { prisma } from '../../../utils/prisma.util';

async function remove(
  userId: string,
  poiId: string,
  isCreator?: boolean
): Promise<void> {
  isCreator
    ? await prisma.user.update({
        where: { id: userId },
        data: {
          pointOfInterests: {
            delete: {
              id: poiId
            }
          }
        }
      })
    : await prisma.user.update({
        where: { id: userId },
        data: {
          sharedPOI: {
            disconnect: {
              id: poiId
            }
          }
        }
      });
}

export { remove };
