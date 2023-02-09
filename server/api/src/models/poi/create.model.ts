import { INewPOI } from '../../ts/poi.type';
import { prisma } from '../../utils/prisma.util';

async function create(newPOI: INewPOI): Promise<void> {
  await prisma.pointOfInterest.create({
    data: {
      creatorId: newPOI.creatorId,
      trailId: newPOI.trailId,
      latitude: newPOI.latitude,
      longitude: newPOI.longitude
    }
  });
}

export { create };
