import { string } from 'joi';
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
      tools: newTrail.tools,
      relatedArticles: newTrail.relatedArticles,
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
const dbTrail = {
  create,
  retrieve,
  findOne
};

export { dbTrail };
