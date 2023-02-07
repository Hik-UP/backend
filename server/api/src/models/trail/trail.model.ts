import { INewTrail, ITrail } from '../../ts/trail.type';
import { prisma } from '../../utils/prisma.util';

async function create(newTrail: INewTrail): Promise<void> {
  await prisma.trail.create({
    data: {
      name: newTrail.name,
      description: newTrail.description,
      pictures: newTrail.pictures,
      latitude: newTrail.latitude,
      longitude: newTrail.longitude,
      difficulty: newTrail.difficulty,
      duration: newTrail.duration,
      distance: newTrail.distance,
      uphill: newTrail.uphill,
      downhill: newTrail.downhill,
      labels: newTrail.labels,
      geoJSON: newTrail.geoJSON
    }
  });
}

async function retrieve(): Promise<ITrail[] | null> {
  return await prisma.trail.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      pictures: true,
      latitude: true,
      longitude: true,
      difficulty: true,
      duration: true,
      distance: true,
      uphill: true,
      downhill: true,
      labels: true,
      geoJSON: true,
      comments: {
        select: {
          id: true,
          author: {
            select: {
              username: true,
              picture: true
            }
          },
          body: true,
          pictures: true,
          date: true
        }
      }
    }
  });
}

const dbTrail = {
  create,
  retrieve
};

export { dbTrail };
