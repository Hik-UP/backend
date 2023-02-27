import { prisma } from '../../../utils/prisma.util';
import { IHike } from '../../../ts/hike.type';
import { dbUserSelector } from '../selector.model';

async function retrieve(userId: string): Promise<{
  organizerHikes: IHike[] | null;
  attendeeHikes: IHike[] | null;
  guestHikes: IHike[] | null;
} | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      organizerHikes: {
        select: dbUserSelector.hike
      },
      attendeeHikes: {
        select: dbUserSelector.hike
      },
      guestHikes: {
        select: dbUserSelector.hike
      }
    }
  });
}

export { retrieve };
