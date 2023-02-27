import { prisma } from '../../../../utils/prisma.util';
import { INewHike } from '../../../../ts/hike.type';

async function create(newTrail: INewHike): Promise<void> {
  await prisma.hike.create({
    data: {
      name: newTrail.name,
      description: newTrail.description,
      trailId: newTrail.trailId,
      organizers: {
        connect: {
          id: newTrail.organizerId
        }
      },
      attendees: {
        connect: {
          id: newTrail.organizerId
        }
      },
      guests: {
        connect: newTrail.guests
      },
      schedule: newTrail.schedule
    }
  });
}

export { create };
