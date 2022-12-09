import { INewPOI } from '../ts/poi.type';
import { prisma } from './prisma.model';

async function create(newPOI: INewPOI): Promise<void> {
  await prisma.pointOfInterest.create({
    data: {
      creatorId: newPOI.creatorId,
      latitude: newPOI.latitude,
      longitude: newPOI.longitude
    }
  });
}

const dbPOI = {
  create
};

export { dbPOI };
