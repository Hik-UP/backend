import { VisibilityEvent } from '@prisma/client';

interface INewEvent {
  title: string;
  description: string;
  coverUrl: string;
  participants: string[];
  invitedUser: string[];
  tags: string[];
  localisation: string;
  nbrParticipants: number;
  visibilityEvent: VisibilityEvent;
}

interface IEvent {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  participants: string[];
  tags: string[];
  localisation: string;
  nbrParticipants: number;
  visibilityEvent: VisibilityEvent;
}

export { INewEvent, IEvent };
