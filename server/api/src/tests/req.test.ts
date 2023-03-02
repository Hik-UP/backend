/* istanbul ignore file */
import request from 'supertest';

import { httpsServer } from '../server/https';
import {
  IHikeTest,
  IPOITest,
  ISkinTest,
  ITrailTest,
  IUserTest
} from './type.test';
import { vars } from './vars.test';
import { db } from './db.test';
import { crypto } from '../utils/cryptography.util';

async function createDefaultUser(): Promise<void> {
  let res = await request(httpsServer)
    .post('/api/auth/signup')
    .send({
      user: {
        username: vars.defaultUser.username,
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });

  res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });
  vars.defaultUser.id = res.body.user.id;
  vars.defaultUser.roles = res.body.user.roles;
  vars.defaultUser.token = res.body.user.token;

  await request(httpsServer)
    .put('/api/user/profile/update')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles,
        picture: vars.defaultUser.picture
      }
    });
}

async function createSkin(): Promise<ISkinTest> {
  const skin = {
    id: '',
    name: crypto.randomString(20),
    description: crypto.randomString(20),
    pictures: [`https://${crypto.randomString(20)}.com`],
    model: `https://${crypto.randomString(20)}.com`
  };
  let res = await request(httpsServer)
    .post('/api/skin/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      skin: {
        name: skin.name,
        description: skin.description,
        pictures: skin.pictures,
        model: skin.model
      }
    });

  res = await request(httpsServer)
    .post('/api/skin/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      }
    });
  skin.id = res.body.skins[res.body.skins.length - 1].id;

  return skin;
}

async function createTrail(): Promise<ITrailTest> {
  const trail = {
    id: '',
    name: `${crypto.randomString(20)}`,
    address: `${crypto.randomString(20)}`,
    description: `${crypto.randomString(20)}`,
    pictures: [`https://${crypto.randomString(20)}.com`],
    latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
    longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12)),
    difficulty: Math.floor(Math.random() * 10),
    duration: Math.floor(Math.random() * 10),
    distance: Math.floor(Math.random() * 10),
    uphill: Math.floor(Math.random() * 10),
    downhill: Math.floor(Math.random() * 10),
    tools: [`${crypto.randomString(20)}`],
    relatedArticles: [`https://${crypto.randomString(20)}.com`],
    labels: [`${crypto.randomString(10)}`],
    geoJSON: `${crypto.randomString(20)}`,
    comments: []
  };
  let res = await request(httpsServer)
    .post('/api/trail/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        name: trail.name,
        address: trail.address,
        description: trail.description,
        pictures: trail.pictures,
        latitude: trail.latitude,
        longitude: trail.longitude,
        difficulty: trail.difficulty,
        duration: trail.duration,
        distance: trail.distance,
        uphill: trail.uphill,
        downhill: trail.downhill,
        tools: trail.tools,
        relatedArticles: trail.relatedArticles,
        labels: trail.labels,
        geoJSON: trail.geoJSON
      }
    });

  res = await request(httpsServer)
    .post('/api/trail/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      }
    });
  trail.id = res.body.trails[res.body.trails.length - 1].id;
  trail.comments = res.body.trails[res.body.trails.length - 1].comments;

  return trail;
}

async function createPOI(): Promise<IPOITest> {
  const trail = await createTrail();
  const poi = {
    latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
    longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12))
  };

  await request(httpsServer)
    .post('/api/poi/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        id: trail.id
      },
      poi: poi
    });

  return poi;
}

async function createHike(guests?: [{ email: string }]): Promise<IHikeTest> {
  const trail = await createTrail();
  const hike = {
    id: '',
    name: `${crypto.randomString(20)}`,
    description: `${crypto.randomString(20)}`,
    trail: trail,
    organizers: [],
    attendees: [],
    guests: [],
    schedule: '',
    createdAt: ''
  };
  let res = await request(httpsServer)
    .post('/api/user/hike/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        id: trail.id
      },
      hike: {
        name: hike.name,
        description: hike.description,
        guests: guests
      }
    });

  res = await request(httpsServer)
    .post('/api/user/hike/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      hike: {
        target: ['organized', 'attendee', 'guest']
      }
    });
  hike.id = res.body.hikes.organized[res.body.hikes.organized.length - 1].id;
  hike.organizers =
    res.body.hikes.organized[res.body.hikes.organized.length - 1].organizers;
  hike.attendees =
    res.body.hikes.organized[res.body.hikes.organized.length - 1].attendees;
  hike.guests =
    res.body.hikes.organized[res.body.hikes.organized.length - 1].guests;
  hike.schedule =
    res.body.hikes.organized[res.body.hikes.organized.length - 1].schedule;
  hike.createdAt =
    res.body.hikes.organized[res.body.hikes.organized.length - 1].createdAt;

  return hike;
}

async function createUser(): Promise<IUserTest> {
  const user = {
    id: '',
    username: crypto.randomString(20),
    email: `test@${crypto.randomString(8)}.com`,
    password: crypto.randomString(64),
    picture: `https://${crypto.randomString(20)}.com`,
    sex: 'M',
    age: Math.floor(Math.random() * (100 - 20) + 20),
    tall: Math.floor(Math.random() * (200 - 90) + 90),
    weight: Math.floor(Math.random() * (200 - 60) + 60),
    roles: [''],
    token: ''
  };
  let res = await request(httpsServer)
    .post('/api/auth/signup')
    .send({
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    });

  res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: user.email,
        password: user.password
      }
    });
  user.id = res.body.user.id;
  user.roles = res.body.user.roles;
  user.token = res.body.user.token;

  await request(httpsServer)
    .put('/api/user/profile/update')
    .set('Authorization', `Bearer ${user.token}`)
    .send({
      user: {
        id: user.id,
        roles: user.roles,
        picture: user.picture
      }
    });

  return user;
}

async function setAdmin(email: string): Promise<void> {
  await db.setAdmin(email);

  const res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });

  vars.defaultUser.id = res.body.user.id;
  vars.defaultUser.roles = res.body.user.roles;
  vars.defaultUser.token = res.body.user.token;
}

const req = {
  createDefaultUser,
  createSkin,
  createTrail,
  createPOI,
  createHike,
  createUser,
  setAdmin
};

export { req };
