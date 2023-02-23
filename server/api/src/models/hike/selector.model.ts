import { dbTrailSelector } from '../trail/selector.model';
import { dbUserSelector } from '../user/selector.model';

const dbHikeSelector = {
  id: true,
  name: true,
  description: true,
  trail: {
    select: dbTrailSelector
  },
  organizers: {
    select: dbUserSelector.publicProfile
  },
  attendees: {
    select: dbUserSelector.publicProfile
  },
  guests: {
    select: dbUserSelector.publicProfile
  },
  schedule: true,
  createdAt: true
};

export { dbHikeSelector };
