import { prisma } from '../../utils/prisma.util';
import { IUpdateUserProfile } from '../../ts/user.type';

async function update(userId: string, user: IUpdateUserProfile): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      username: user.username,
      email: user.email,
      picture: user.picture,
      fcmToken: user.fcmToken,
      skinId: user.skinId
    }
  });
}

export { update };
