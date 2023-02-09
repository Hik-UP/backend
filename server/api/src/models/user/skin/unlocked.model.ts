import { ISkin } from '../../../ts/skin.type';
import { prisma } from '../../../utils/prisma.util';

async function unlocked(userId: string): Promise<{ skinList: ISkin[] } | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      skinList: {
        select: {
          id: true,
          name: true,
          description: true,
          pictures: true,
          model: true
        }
      }
    }
  });
}

export { unlocked };
