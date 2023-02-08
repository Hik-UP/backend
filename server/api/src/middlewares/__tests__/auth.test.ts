import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../server/https';
import { dbTest } from '../../models/test/test.model';
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
  token: ''
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
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', 'Bearer')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}x`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer x${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer x${User.token}x`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        foo: 'bar'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: randomUUID(),
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: ['ADMIN']
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});
