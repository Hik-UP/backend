import { prisma } from '../../utils/prisma.util';
import { ITrail } from '../../ts/trail.type';
import { dbTrailSelector } from './selector.model';

async function findOne(id: string): Promise<ITrail | null> {
  return await prisma.trail.findUnique({
    where: {
      id: id
    },
    select: dbTrailSelector
  });
}

export { findOne };
