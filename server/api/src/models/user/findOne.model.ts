import { prisma } from '../../utils/prisma.util';
import { IUserProfile } from '../../ts/user.type';

async function findOne(id: string): Promise<IUserProfile | null> {
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      username: true,
      email: true,
      picture: true,
      skin: {
        select: {
          id: true,
          name: true,
          description: true,
          pictures: true,
          model: true
        }
      },
      roles: true
    }
  });
}

export { findOne };
