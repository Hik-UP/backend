import request from 'supertest';

import { httpsServer } from '../../server/https';
import { dbTest } from '../../models/test.model';
import { crypto } from '../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  accessToken: ''
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
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
          foo: 'bar'
        }
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
          id: User.userId
        },
        trail: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setUserAdmin(User.email);
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
    expect(res.body.user.roles).toEqual(['USER', 'ADMIN']);
    expect(typeof res.body.user.accessToken).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.accessToken = res.body.user.accessToken;
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
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});
