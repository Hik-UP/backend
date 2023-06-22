import { prisma } from '../../utils/prisma.util';

async function update(id: string, data: any): Promise<void> {
  await prisma.event.update({ data: data, where: { id: id } });
}

export default update;
