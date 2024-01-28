import { prisma } from '../../../utils/prisma.util';
import { IUpdateUserSecrets } from '../../../ts/user.type';

async function update(
  user: { id?: string; email?: string },
  secrets: IUpdateUserSecrets
): Promise<void> {
  await prisma.user.update({
    where: user.id ? { id: user.id } : { email: user.email },
    data: {
      password: secrets.password
    }
  });
}

export { update };
