import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  picture:
    'https://static.wikia.nocookie.net/denaruto3/images/f/f0/BorutoInMovie.png/revision/latest?cb=20150513165125&path-prefix=de',
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

describe('POST /user/profile', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/user/profile')
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

describe('PUT /user/profile/update', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          foo: 'bar'
        }
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          username: crypto.randomString(20),
          email: `test@${crypto.randomString(8)}.com`,
          picture: 'https://google.com',
          foo: 'bar'
        }
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          picture: 'https://google.com'
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Updated');
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          email: `test@${crypto.randomString(8)}.com`
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Updated');
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          username: crypto.randomString(20)
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Updated');
  });
});

describe('PUT /user/profile/update', () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      .put('/api/user/profile/update')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          username: crypto.randomString(20),
          email: `test@${crypto.randomString(8)}.com`
        }
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Updated');
  });
});