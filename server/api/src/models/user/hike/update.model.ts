import { prisma } from '../../../utils/prisma.util';
import { dbUser } from '../user.model';
import { IUpdateHike } from '../../../ts/hike.type';

async function update(hike: IUpdateHike): Promise<void> {
  await prisma.hike.update({
    where: { id: hike.id },
    data: {
      name: hike.name,
      description: hike.description,
      trailId: hike.trailId,
      attendees: {
        disconnect: hike.attendees?.remove
      },
      guests: {
        connect: hike.guests?.add,
        disconnect: hike.guests?.remove
      },
      status: hike.status,
      schedule: hike.schedule
    }
  });
  for (const user of hike.attendees?.remove || []) {
    await dbUser.hike.stats.remove(user.email, hike.id);
  }
}

export { update };
