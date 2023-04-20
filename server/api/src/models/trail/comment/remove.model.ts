import { prisma } from '../../../utils/prisma.util';

async function remove(userId: string, commentId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      trailComments: {
        delete: {
          id: commentId
        }
      }
    }
  });
}

export { remove };
