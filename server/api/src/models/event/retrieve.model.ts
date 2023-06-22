import { VisibilityEvent } from '@prisma/client';
import { IEvent } from '../../ts/event.type';
import { prisma } from '../../utils/prisma.util';
import dbEventSelector from './selector.model';

export default async function retrieve(
  visibility: VisibilityEvent
): Promise<IEvent[] | null> {
  return await prisma.event.findMany({
    select: dbEventSelector,
    where: {
      visibilityEvent: visibility
    }
  });
}
