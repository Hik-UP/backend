import { ISkin } from '../../ts/skin.type';
import { prisma } from '../../utils/prisma.util';
import { dbSkinSelector } from './selector.model';

async function retrieveSkinWithId(
  id: string
): Promise<ISkin | undefined | null> {
  return await prisma.skin.findUnique({
    where: { id: id },
    select: dbSkinSelector
  });
}

export { retrieveSkinWithId };
