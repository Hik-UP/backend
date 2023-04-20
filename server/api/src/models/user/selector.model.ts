import { dbTrailSelector } from '../trail/selector.model';

const privateProfile = {
  username: true,
  email: true,
  picture: true,
  skin: {
    select: {
      id: true,
      name: true,
      description: true,
      pictures: true,
      model: true
    }
  },
  roles: true
};

const publicProfile = {
  username: true,
  picture: true
};

const secrets = {
  id: true,
  password: true,
  fcmToken: true
};

const hike = {
  id: true,
  name: true,
  description: true,
  trail: {
    select: dbTrailSelector
  },
  organizers: {
    select: publicProfile
  },
  attendees: {
    select: publicProfile
  },
  guests: {
    select: publicProfile
  },
  schedule: true,
  createdAt: true
};

const poi = {
  id: true,
  name: true,
  description: true,
  pictures: true,
  creator: {
    select: publicProfile
  },
  sharedWith: {
    select: publicProfile
  },
  trail: {
    select: dbTrailSelector
  },
  latitude: true,
  longitude: true,
  createdAt: true
};

const dbUserSelector = {
  privateProfile,
  publicProfile,
  secrets,
  hike,
  poi
};

export { dbUserSelector };
