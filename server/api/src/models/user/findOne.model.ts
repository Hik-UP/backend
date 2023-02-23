import { prisma } from '../../utils/prisma.util';
import { IUserProfile } from '../../ts/user.type';
import { dbUserSelector } from './selector.model';

async function findOne(id: string): Promise<IUserProfile | null> {
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    select: dbUserSelector.privateProfile
  });
}

export { findOne };
