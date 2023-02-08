import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
});

const User = {
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64)
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer).post('/api/auth/signup').send({
      user: User
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer).post('/api/auth/signup').send({
      user: User
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: `test@${crypto.randomString(8)}.com`,
          password: crypto.randomString(64)
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: crypto.randomString(20),
          email: User.email,
          password: crypto.randomString(64)
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /auth/signup', () => {
  jest.setTimeout(60000);
  it('should return 201', async () => {
    for (let i = 0; i < 20; i += 1) {
      const newUser = {
        id: '',
        username: crypto.randomString(20),
        email: `test@${crypto.randomString(8)}.com`,
        password: crypto.randomString(64),
        picture: [],
        roles: [],
        token: ''
      };
      let res = await request(httpsServer)
        .post('/api/auth/signup')
        .send({
          user: {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
          }
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject({ message: 'Created' });
      res = await request(httpsServer)
        .post('/api/auth/login')
        .send({
          user: {
            email: newUser.email,
            password: newUser.password
          }
        });

      newUser.id = res.body.user.id;
      newUser.roles = res.body.user.roles;
      newUser.token = res.body.user.token;

      res = await request(httpsServer)
        .post('/api/user/profile')
        .set('Authorization', `Bearer ${newUser.token}`)
        .send({
          user: {
            id: newUser.id,
            roles: newUser.roles
          }
        });

      newUser.picture = res.body.user.picture;

      expect(res.body.user).toMatchObject({
        username: newUser.username,
        email: newUser.email,
        picture: newUser.picture
      });
    }
  });
});
