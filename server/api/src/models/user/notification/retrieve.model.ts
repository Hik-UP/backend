import { prisma } from '../../../utils/prisma.util';
import { INotification } from '../../../ts/notification.type';
import { dbNotificationSelector } from './selector.model';

async function retrieve(userId: string): Promise<INotification[] | null> {
  return await prisma.notification.findMany({
    where: {
      receiverId: userId
    },
    select: dbNotificationSelector
  });
}

export { retrieve };
