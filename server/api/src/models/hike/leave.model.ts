import { prisma } from '../../utils/prisma.util';

async function leave(userId: string, hikeId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      attendeeHikes: {
        disconnect: {
          id: hikeId
        }
      }
    }
  });
}

export { leave };
