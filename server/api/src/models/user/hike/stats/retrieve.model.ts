import { prisma } from '../../../../utils/prisma.util';

async function retrieve(
  userId: string,
  hikeId: string
): Promise<
  | {
      coins: number,
      steps: number;
      distance: number;
      completed: boolean;
    }[]
  | null
> {
  return await prisma.stats.findMany({
    where: { AND: [{ hikeId: hikeId }, { userId: userId }] },
    select: {
      coins: true,
      steps: true,
      distance: true,
      completed: true
    }
  });
}

export { retrieve };
