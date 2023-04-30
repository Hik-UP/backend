import { firebase } from './firebase.util';
import { dbUser } from '../models/user/user.model';
import { logger } from './logger.util';

async function send(newNotification: {
  receiversId?: string[];
  receiversEmail?: string[];
  title: string;
  body: string;
}): Promise<void> {
  try {
    const users = [];
    const notification = {
      title: newNotification.title,
      body: newNotification.body
    };

    for (const id of newNotification.receiversId || []) {
      const fcmToken = (await dbUser.findSecrets({ id: id }))?.fcmToken;

      if (fcmToken) {
        users.push({ id: id, fcmToken: fcmToken });
      }
    }
    for (const email of newNotification.receiversEmail || []) {
      const id = (await dbUser.findSecrets({ email: email }))?.id;
      const fcmToken = (await dbUser.findSecrets({ email: email }))?.fcmToken;

      if (id && fcmToken) {
        users.push({ id: id, fcmToken: fcmToken });
      }
    }
    for (const user of users) {
      if (process.env.ENV !== 'TEST') {
        await firebase.messaging().send({ token: user.fcmToken, notification });
      }
      await dbUser.notification.create({
        receiverId: user.id,
        title: newNotification.title,
        body: newNotification.body
      });

      logger.info('Notification sending succeed');
    }
  } catch (error) {
    logger.error('Notification sending failed\n' + error);
  }
}

const notification = {
  send
};

export { notification };
