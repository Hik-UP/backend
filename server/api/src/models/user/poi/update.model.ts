import { prisma } from '../../../utils/prisma.util';
import { IUpdatePOI } from '../../../ts/poi.type';

async function update(userId: string, poi: IUpdatePOI): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      pointOfInterests: {
        update: {
          where: {
            id: poi.id
          },
          data: {
            name: poi.name,
            description: poi.description,
            pictures: poi.pictures,
            sharedWith: {
              connect: poi.sharedWith?.add,
              disconnect: poi.sharedWith?.remove
            }
          }
        }
      }
    }
  });
}

export { update };
