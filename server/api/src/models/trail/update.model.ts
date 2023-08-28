import { prisma } from '../../utils/prisma.util';
import { IUpdateTrail } from '../../ts/trail.type';

async function update(trail: IUpdateTrail): Promise<void> {
  await prisma.trail.update({
    where: { id: trail.id },
    data: {
      name: trail.name,
      address: trail.address,
      description: trail.description,
      pictures: trail.pictures,
      latitude: trail.latitude,
      longitude: trail.longitude,
      difficulty: trail.difficulty,
      duration: trail.duration,
      distance: trail.distance,
      uphill: trail.uphill,
      downhill: trail.downhill,
      tools: trail.tools,
      relatedArticles: trail.relatedArticles,
      labels: trail.labels,
      geoJSON: trail.geoJSON
    }
  });
}

export { update };
