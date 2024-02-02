import { prisma } from '../../../utils/prisma.util';

async function update(token: {
  id: string;
  value?: string;
  store?: string | null;
  createdAt?: Date;
}): Promise<void> {
  await prisma.token.update({
    where: { id: token.id },
    data: {
      value: token.value,
      store: token.store,
      createdAt: token.createdAt
    }
  });
}

export { update };
