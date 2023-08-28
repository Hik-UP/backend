import { prisma } from '../../../../utils/prisma.util';

async function update(
  userId: string,
  hikeId: string,
  newStats: { steps: number; distance: number; completed: boolean }
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      stats: {
        updateMany: {
          where: {
            hikeId: hikeId
          },
          data: {
            steps: newStats.steps,
            distance: newStats.distance,
            completed: newStats.completed
          }
        }
      }
    }
  });
}

export { update };
