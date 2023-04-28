import { prisma } from '../../../utils/prisma.util';
import { IUpdateNotification } from '../../../ts/notification.type';

async function update(
  userId: string,
  notificationId: string,
  notification: IUpdateNotification
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      notifications: {
        update: {
          where: {
            id: notificationId
          },
          data: {
            read: notification.read
          }
        }
      }
    }
  });
}

export { update };
