import { prisma } from '../../../utils/prisma.util';
import { INewHike, IHikeResult } from '../../../ts/hike.type';

async function create(newHike: INewHike): Promise<IHikeResult | undefined> {
  const hike = await prisma.hike.create({
    data: {
      name: newHike.name,
      description: newHike.description,
      coins: {
        createMany: {
          data: newHike.coins
        }
      },
      trailId: newHike.trailId,
      organizers: {
        connect: {
          id: newHike.organizerId
        }
      },
      attendees: {
        connect: {
          id: newHike.organizerId
        }
      },
      guests: {
        connect: newHike.guests
      },
      stats: {
        create: {
          user: {
            connect: {
              id: newHike.organizerId
            }
          }
        }
      },
      status: newHike.status,
      schedule: newHike.schedule
    }
  });

  return hike;
}

export { create };
