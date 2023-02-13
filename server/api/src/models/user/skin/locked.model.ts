import { ISkin } from '../../../ts/skin.type';
import { prisma } from '../../../utils/prisma.util';

async function locked(userId: string): Promise<ISkin[] | null> {
  return await prisma.skin.findMany({
    where: {
      owners: {
        none: {
          id: userId
        }
      }
    },
    select: {
      id: true,
      name: true,
      description: true,
      pictures: true,
      model: true
    }
  });
}

export { locked };
