import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test.model';
import { crypto } from '../../../utils/cryptography.util';

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeUser(User.email);
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  accessToken: ''
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

describe('POST /poi/create', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        poi: PointOfInterest
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /poi/create', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
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
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
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
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        poi: {
          longitude: PointOfInterest.longitude
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.poi.length).toBeGreaterThanOrEqual(1);
    expect(typeof res.body.poi[0].latitude).toBe('number');
    expect(typeof res.body.poi[0].longitude).toBe('number');
    expect(res.body.poi).toContainEqual(PointOfInterest);
  });
});
