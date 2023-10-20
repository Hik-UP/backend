import { IEvent } from '../../ts/event.type';
import { prisma } from '../../utils/prisma.util';
import dbEvent from './event.model';

async function update(id: string, data: any): Promise<void> {
  await prisma.event.update({ data: data, where: { id: id } });
}

export async function removeParticipant(
  userId: string,
  eventId: string
): Promise<void> {
  const event = (await prisma.event.findUnique({
    where: { id: eventId }
  })) as IEvent;
  const participants = event.participants;
  const newParticipants = participants.filter((value) => {
    return value != userId;
  });
  await prisma.event.update({
    data: { participants: { set: newParticipants } },
    where: {
      id: eventId
    }
  });
}

export default update;
