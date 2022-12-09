import { INewPOI, IPOI } from '../ts/poi.type';
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

async function retrieve(): Promise<IPOI[] | null> {
  return await prisma.pointOfInterest.findMany({
    select: {
      latitude: true,
      longitude: true
    }
  });
}

const dbPOI = {
  create,
  retrieve
};

export { dbPOI };
