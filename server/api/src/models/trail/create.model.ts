import { prisma } from '../../utils/prisma.util';
import { INewTrail } from '../../ts/trail.type';

async function create(newTrail: INewTrail): Promise<void> {
  await prisma.trail.create({
    data: {
      name: newTrail.name,
      address: newTrail.address,
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

export { create };
