import { prisma } from '../../utils/prisma.util';
import { IHike } from '../../ts/hike.type';
import { dbUserSelector } from '../user/selector.model';
import { dbTrailSelector } from '../trail/selector.model';

async function findOne(hikeId: string): Promise<IHike | null> {
  return await prisma.hike.findUnique({
    where: {
      id: hikeId
    },
    select: {
      name: true,
      description: true,
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
      schedule: true,
      createdAt: true
    }
  });
}

export { findOne };
