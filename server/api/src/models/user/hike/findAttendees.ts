import { prisma } from '../../../utils/prisma.util';
import { dbUserSelector } from '../selector.model';
import { IUserProfile } from '../../../ts/user.type';

async function findAttendees(
  hikeId: string
): Promise<{ attendees: IUserProfile[] } | null> {
  return await prisma.hike.findUnique({
    where: {
      id: hikeId
    },
    select: {
      attendees: {
        select: dbUserSelector.privateProfile
      }
    }
  });
}

export { findAttendees };
