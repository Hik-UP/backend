import { prisma } from '../../../../utils/prisma.util';

async function retrieve(
  userId: string,
  hikeId: string
): Promise<
  | {
      steps: number;
      distance: number;
      completed: boolean;
    }[]
  | null
> {
  return await prisma.stats.findMany({
    where: { AND: [{ hikeId: hikeId }, { userId: userId }] },
    select: {
      steps: true,
      distance: true,
      completed: true
    }
  });
}

export { retrieve };
