import { prisma } from '../../utils/prisma.util';
import { INewUser } from '../../ts/user.type';
import { dbSkin } from '../skin/skin.model';

async function create(newUser: INewUser): Promise<void> {
  const { id: skinId } = ((await dbSkin.retrieve()) || [])[0] || {};

  await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      picture: '',
      skinId: skinId,
      skins: {
        connect: {
          id: skinId
        }
      }
    }
  });
}

export { create };
