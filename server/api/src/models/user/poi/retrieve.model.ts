import { prisma } from '../../../utils/prisma.util';
import { IPOI } from '../../../ts/poi.type';
import { dbUserSelector } from '../selector.model';

async function retrieve(userId: string): Promise<{
  pointOfInterests: IPOI[] | null;
  sharedPOI: IPOI[] | null;
} | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      pointOfInterests: {
        select: dbUserSelector.poi
      },
      sharedPOI: {
        select: dbUserSelector.poi
      }
    }
  });
}

export { retrieve };
