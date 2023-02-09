import { ISkin } from '../../ts/skin.type';
import { prisma } from '../../utils/prisma.util';

async function retrieve(): Promise<ISkin[] | null> {
  return await prisma.skin.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      pictures: true,
      model: true
    }
  });
}

export { retrieve };
