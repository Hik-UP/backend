import { prisma } from '../../utils/prisma.util';
import { IUpdateHike } from '../../ts/hike.type';

async function update(userId: string, hike: IUpdateHike): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      organizerHikes: {
        update: {
          where: {
            id: hike.id
          },
          data: {
            name: hike.name,
            description: hike.description,
            trailId: hike.trailId,
            attendees: {
              disconnect: hike.guests?.remove
            },
            guests: {
              connect: hike.guests?.add,
              disconnect: hike.guests?.remove
            },
            schedule: hike.schedule
          }
        }
      }
    }
  });
}

export { update };