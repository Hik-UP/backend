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
        trail: Trail
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
          id: Trail.id
        },
        poi: {
          latitude: PointOfInterest.latitude
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
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
          id: Trail.id
        },
        poi: {
          longitude: PointOfInterest.longitude
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /poi/create', () => {
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
        difficulty: 0,
        duration: 0,
        distance: 0,
        uphill: 0,
        downhill: 0,
        labels: [`${crypto.randomString(20)}`],
        geoJSON: `${crypto.randomString(20)}`
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
          trail: newTrail
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
