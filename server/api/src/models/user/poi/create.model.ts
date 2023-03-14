import { INewPOI } from '../../../ts/poi.type';
import { prisma } from '../../../utils/prisma.util';

async function create(newPOI: INewPOI): Promise<void> {
  await prisma.pointOfInterest.create({
    data: {
      name: newPOI.name,
      description: newPOI.description,
      pictures: newPOI.pictures,
      creatorId: newPOI.creatorId,
      sharedWith: {
        connect: newPOI.sharedWith
      },
      trailId: newPOI.trailId,
      latitude: newPOI.latitude,
      longitude: newPOI.longitude
    }
  });
}

export { create };
