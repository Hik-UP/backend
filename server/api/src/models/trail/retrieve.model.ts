import { prisma } from '../../utils/prisma.util';
import { ITrail } from '../../ts/trail.type';

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

export { retrieve };
