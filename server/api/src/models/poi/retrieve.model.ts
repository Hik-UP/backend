import { prisma } from '../../utils/prisma.util';
import { IPOI } from '../../ts/poi.type';

async function retrieve(): Promise<IPOI[] | null> {
  return await prisma.pointOfInterest.findMany({
    select: {
      latitude: true,
      longitude: true
    }
  });
}

export { retrieve };
