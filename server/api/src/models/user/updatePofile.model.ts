import { prisma } from '../../utils/prisma.util';

async function updateProfile(id: string, picture: string): Promise<void> {
  await prisma.user.update({
    where: { id: id },
    data: {
      picture
    }
  });
}

export { updateProfile };
