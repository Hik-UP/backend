import { prisma } from '../../../../utils/prisma.util';

async function retrieve(
  hikeId: string
): Promise<
  | { coins: {
      id: string;
      latitude: number;
      longitude: number;
  }[]
    }
  | null
> {
  return await prisma.hike.findUnique({
    where: { id: hikeId },
    select: {
      coins: true
    }
  });
}

export { retrieve };
