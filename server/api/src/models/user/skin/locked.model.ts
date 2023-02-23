import { ISkin } from '../../../ts/skin.type';
import { prisma } from '../../../utils/prisma.util';
import { dbSkinSelector } from '../../skin/selector.model';

async function locked(userId: string): Promise<ISkin[] | null> {
  return await prisma.skin.findMany({
    where: {
      owners: {
        none: {
          id: userId
        }
      }
    },
    select: dbSkinSelector
  });
}

export { locked };
