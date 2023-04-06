import { INewNotification } from '../../../ts/notification.type';
import { prisma } from '../../../utils/prisma.util';

async function create(newNotification: INewNotification): Promise<void> {
  await prisma.notification.create({
    data: {
      receiverId: newNotification.receiverId,
      title: newNotification.title,
      body: newNotification.body
    }
  });
}

export { create };
