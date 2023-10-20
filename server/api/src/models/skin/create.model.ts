import { INewSkin } from '../../ts/skin.type';
import { prisma } from '../../utils/prisma.util';

async function create(newSkin: INewSkin): Promise<void> {
  await prisma.skin.create({
    data: {
      name: newSkin.name,
      description: newSkin.description,
      pictures: newSkin.pictures,
      model: newSkin.model,
      price: newSkin.price
    }
  });
}

export { create };
