import { prisma } from '../../../utils/prisma.util';
import { IHike } from '../../../ts/hike.type';
import { dbUserSelector } from '../selector.model';
import { dbTrailSelector } from '../../trail/selector.model';

async function findOne(hikeId: string): Promise<IHike | null> {
  return await prisma.hike.findUnique({
    where: {
      id: hikeId
    },
    select: {
      id: true,
      name: true,
      description: true,
      coins: {
        select: {
          id: true,
          latitude: true,
          longitude: true
        }
      },
      trail: {
        select: dbTrailSelector
      },
      organizers: {
        select: dbUserSelector.publicProfile
      },
      attendees: {
        select: dbUserSelector.publicProfile
      },
      guests: {
        select: dbUserSelector.publicProfile
      },
      stats: { select: dbUserSelector.stats },
      status: true,
      schedule: true,
      createdAt: true
    }
  });
}

export { findOne };
