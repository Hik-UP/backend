import { ISkin } from '../../../ts/skin.type';
import { prisma } from '../../../utils/prisma.util';
import { dbSkinSelector } from '../../skin/selector.model';

async function unlocked(userId: string): Promise<{ skins: ISkin[] } | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      skins: {
        select: dbSkinSelector
      }
    }
  });
}

export { unlocked };
