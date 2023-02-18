import { prisma } from '../../utils/prisma.util';
import { ITrail } from '../../ts/trail.type';

async function findOne(id: string): Promise<ITrail | null> {
  return await prisma.trail.findUnique({
    where: {
      id: id
    },
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
      tools: true,
      relatedArticles: true,
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

export { findOne };
