import { prisma } from '../../../utils/prisma.util';
import { INotification } from '../../../ts/notification.type';
import { dbNotificationSelector } from './selector.model';

async function retrieve(
  userId: string
): Promise<{ notifications: INotification[] | null } | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      notifications: {
        select: dbNotificationSelector
      }
    }
  });
}

export { retrieve };
