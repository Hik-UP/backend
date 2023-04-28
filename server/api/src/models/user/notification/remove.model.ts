import { prisma } from '../../../utils/prisma.util';

async function remove(userId: string, notificationId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      notifications: {
        delete: {
          id: notificationId
        }
      }
    }
  });
}

export { remove };
