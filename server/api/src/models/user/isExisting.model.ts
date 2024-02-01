import { prisma } from '../../utils/prisma.util';

async function isExisting(user: {
  email?: string;
  username?: string;
}): Promise<boolean> {
  return (
    (await prisma.user.findUnique({
      where: user.email ? { email: user.email } : { username: user.username }
    })) !== null
  );
}

export { isExisting };
