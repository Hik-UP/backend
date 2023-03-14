import { prisma } from '../../utils/prisma.util';
import { ITrail } from '../../ts/trail.type';
import { dbTrailSelector } from './selector.model';

async function retrieve(): Promise<ITrail[] | null> {
  return await prisma.trail.findMany({
    select: dbTrailSelector
  });
}

export { retrieve };
