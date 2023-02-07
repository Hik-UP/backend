import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllTrails();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllTrails();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  accessToken: ''
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
  geoJSON: `${crypto.randomString(20)}`,
  comments: []
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
    expect(res.body.user.roles).toEqual(['USER']);
    expect(typeof res.body.user.accessToken).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.accessToken = res.body.user.accessToken;
  });
});

describe('POST /trail/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: Trail
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: Trail
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/create', () => {
  it('should return 201', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: Trail
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /trail/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: Trail
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /trail/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
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
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /trail/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          name: `${crypto.randomString(20)}`,
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
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /trail/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`${crypto.randomString(20)}`],
          longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
          difficulty: 0,
          duration: 0,
          distance: 0,
          uphill: 0,
          downhill: 0,
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /trail/retrieve', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/retrieve')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.trails.length).toBeGreaterThanOrEqual(1);
    expect(typeof res.body.trails[0].name).toBe('string');
    expect(typeof res.body.trails[0].description).toBe('string');
    expect(typeof res.body.trails[0].pictures[0]).toBe('string');
    expect(typeof res.body.trails[0].latitude).toBe('number');
    expect(typeof res.body.trails[0].longitude).toBe('number');
    expect(typeof res.body.trails[0].difficulty).toBe('number');
    expect(typeof res.body.trails[0].duration).toBe('number');
    expect(typeof res.body.trails[0].distance).toBe('number');
    expect(typeof res.body.trails[0].uphill).toBe('number');
    expect(typeof res.body.trails[0].downhill).toBe('number');
    expect(typeof res.body.trails[0].labels[0]).toBe('string');
    expect(typeof res.body.trails[0].geoJSON).toBe('string');
    Trail.id = res.body.trails[0].id;
    Trail.comments = res.body.trails[0].comments;
    expect(res.body.trails).toContainEqual(Trail);
  });
});

describe('POST /trail/create', () => {
  it('should return 201', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
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
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /trail/retrieve', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/retrieve')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.trails.length).toBeGreaterThanOrEqual(2);
  });
});
