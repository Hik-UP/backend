import { prisma } from '../../utils/prisma.util';
import { INewUser } from '../../ts/user.type';
import { dbSkin } from '../skin/skin.model';

async function create(newUser: INewUser): Promise<void> {
  const { id: skinId } = ((await dbSkin.retrieve()) || [])[0] || {};
  const pictures = [
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F1.jpg?alt=media&token=dbbe270d-d558-413e-a0b4-9c87771df510',
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F2.jpg?alt=media&token=893f091f-fe0e-4956-af07-877f35c3599a',
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F3.jpg?alt=media&token=f16947c2-62ee-47bd-9096-05e650093c6b',
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F4.jpg?alt=media&token=34d6f54d-28aa-4f5f-95df-fbe3c7df8c0a',
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F5.jpg?alt=media&token=1c440ade-5119-4f70-867d-6c289ad53cb7',
    'https://firebasestorage.googleapis.com/v0/b/hikup-app.appspot.com/o/avatars%2F6.jpg?alt=media&token=34a0beec-a075-468e-8d2d-037d51341d51'
  ];
  const picture = pictures[Math.floor(Math.random() * 6)];

  await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      picture: picture,
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
