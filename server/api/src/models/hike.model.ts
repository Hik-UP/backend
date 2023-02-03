import { INewHike, IHike } from '../ts/hike.type';
import { prisma } from './prisma.model';

async function create(newhike: INewHike): Promise<void> {
  await prisma.hike.create({
    data: {
      name: newhike.name,
      description: newhike.description,
      picture: newhike.picture,
      latitude: newhike.latitude,
      longitude: newhike.longitude,
      difficulty: newhike.difficulty,
      duration: newhike.duration,
      distance: newhike.distance,
      uphill: newhike.uphill,
      downhill: newhike.downhill,
      label: newhike.label
    }
  });
}

async function retrieve(): Promise<IHike[] | null> {
  return await prisma.hike.findMany({
    select: {
      name: true,
      description: true,
      picture: true,
      latitude: true,
      longitude: true,
      difficulty: true,
      duration: true,
      distance: true,
      uphill: true,
      downhill: true,
      label: true
    }
  });
}

const dbHike = {
  create,
  retrieve
};

export { dbHike };
