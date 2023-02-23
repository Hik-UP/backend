import { ISkin } from '../../ts/skin.type';
import { prisma } from '../../utils/prisma.util';
import { dbSkinSelector } from './selector.model';

async function retrieve(): Promise<ISkin[] | null> {
  return await prisma.skin.findMany({
    select: dbSkinSelector
  });
}

export { retrieve };
