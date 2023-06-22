import { prisma } from '../../utils/prisma.util';
import { INewEvent } from '../../ts/event.type';

export default async function create(newEvent: INewEvent): Promise<void> {
  await prisma.event.create({
    data: {
      title: newEvent.title,
      description: newEvent.description,
      coverUrl: newEvent.coverUrl,
      participants: newEvent.participants,
      invitedUser: newEvent.invitedUser,
      tags: newEvent.tags,
      localisation: newEvent.localisation,
      nbrParticipants: newEvent.nbrParticipants,
      visibilityEvent: newEvent.visibilityEvent
    }
  });
}
