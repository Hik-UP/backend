import { prisma } from '../../utils/prisma.util';
import { IUpdateUserProfile } from '../../ts/user.type';

async function update(
  id: string,
  newProfile: IUpdateUserProfile
): Promise<void> {
  await prisma.user.update({
    where: { id: id },
    data: {
      username: newProfile.username,
      email: newProfile.email,
      picture: newProfile.picture
    }
  });
}

export { update };
