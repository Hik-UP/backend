import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllPOI();
  await dbTest.removeAllTrails();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllPOI();
  await dbTest.removeAllTrails();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: ''
};

const Trail = {
  id: '',
  name: `${crypto.randomString(20)}`,
  description: `${crypto.randomString(20)}`,
  pictures: [`${crypto.randomString(20)}`],
  latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
  longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
  difficulty: 0,
  duration: 0,
  distance: 0,
  uphill: 0,
  downhill: 0,
  tools: [`${crypto.randomString(20)}`],
  relatedArticles: [`${crypto.randomString(20)}`],
  labels: [`${crypto.randomString(20)}`],
  geoJSON: `${crypto.randomString(20)}`
};

const PointOfInterest = {
  latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
  longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12))
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user.id).toBe('string');
    expect(res.body.user.roles).toEqual(['ADMIN']);
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /poi/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          id: Trail.id
        },
        poi: PointOfInterest
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: PointOfInterest
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /poi/create', () => {
  it('should return 500', async () => {
    await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          name: Trail.name,
          description: Trail.description,
          pictures: Trail.pictures,
          latitude: Trail.latitude,
          longitude: Trail.longitude,
          difficulty: Trail.difficulty,
          duration: Trail.duration,
          distance: Trail.distance,
          uphill: Trail.uphill,
          downhill: Trail.downhill,
          tools: Trail.tools,
          relatedArticles: Trail.relatedArticles,
          labels: Trail.labels,
          geoJSON: Trail.geoJSON
        }
      });
    let res = await request(httpsServer)
      .post('/api/trail/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });

    Trail.id = res.body.trails[0].id;

    res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          id: Trail.id
        },
        poi: {
          latitude: `${PointOfInterest.latitude}`,
          longitude: `${PointOfInterest.longitude}`
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /poi/create', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          id: Trail.id
        },
        poi: {
          latitude: PointOfInterest.latitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /poi/create', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          id: Trail.id
        },
        poi: {
          longitude: PointOfInterest.longitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /poi/create', () => {
  jest.setTimeout(60000);
  it('should return 201', async () => {
    await dbTest.removeAllTrails();
    for (let i = 0; i < 20; i += 1) {
      const newTrail = {
        id: '',
        name: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`${crypto.randomString(20)}`],
        latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
        longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
        difficulty: Math.floor(Math.random() * 10),
        duration: Math.floor(Math.random() * 10),
        distance: Math.floor(Math.random() * 10),
        uphill: Math.floor(Math.random() * 10),
        downhill: Math.floor(Math.random() * 10),
        tools: [`${crypto.randomString(20)}`],
        relatedArticles: [`${crypto.randomString(20)}`],
        labels: [`${crypto.randomString(20)}`],
        geoJSON: `${crypto.randomString(20)}`,
        comments: []
      };
      const newPointOfInterest = {
        latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
        longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12))
      };
      let res = await request(httpsServer)
        .post('/api/trail/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: {
            name: newTrail.name,
            description: newTrail.description,
            pictures: newTrail.pictures,
            latitude: newTrail.latitude,
            longitude: newTrail.longitude,
            difficulty: newTrail.difficulty,
            duration: newTrail.duration,
            distance: newTrail.distance,
            uphill: newTrail.uphill,
            downhill: newTrail.downhill,
            tools: newTrail.tools,
            relatedArticles: newTrail.relatedArticles,
            labels: newTrail.labels,
            geoJSON: newTrail.geoJSON
          }
        });
      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });

      newTrail.id = res.body.trails[i].id;

      res = await request(httpsServer)
        .post('/api/poi/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: {
            id: newTrail.id
          },
          poi: newPointOfInterest
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject({ message: 'Created' });

      res = await request(httpsServer)
        .post('/api/poi/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });

      expect(res.body.poi.length).toEqual(i + 1);

      expect(res.body.poi).toContainEqual(newPointOfInterest);
    }
  });
});
