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
      model: true,
      price: true,
      owners: true
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
  isVerified: true,
  tokens: true,
  password: true,
  fcmToken: true
};

const stats = {
  user: {
    select: publicProfile
  },
  steps: true,
  distance: true,
  completed: true
};

const hike = {
  id: true,
  name: true,
  description: true,
  coins: {
    select: {
      id: true,
      latitude: true,
      longitude: true
    }
  },
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
  stats: {
    select: stats
  },
  status: true,
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
  stats,
  hike,
  poi
};

export { dbUserSelector };
