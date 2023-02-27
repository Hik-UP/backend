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
  roles: [''],
  token: ''
};

const Skin = {
  name: crypto.randomString(20),
  description: crypto.randomString(20),
  pictures: [`https://${crypto.randomString(20)}.com`],
  model: `https://${crypto.randomString(20)}.com`
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

describe('POST /skin/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/skin/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        skin: Skin
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
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

    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /skin/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/skin/create')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        skin: Skin
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /skin/create', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/skin/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        skin: {
          description: Skin.description,
          pictures: Skin.pictures,
          model: Skin.model
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /skin/create', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/skin/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        skin: {
          name: Skin.name,
          pictures: Skin.pictures,
          model: Skin.model
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /skin/create', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/skin/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        skin: {
          name: Skin.name,
          description: Skin.description,
          pictures: Skin.pictures
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /skin/create', () => {
  it('should return 201', async () => {
    for (let i = 0; i < 15; i += 1) {
      const newSkin = {
        id: '',
        name: crypto.randomString(20),
        description: crypto.randomString(20),
        pictures: [`https://${crypto.randomString(20)}.com`],
        model: `https://${crypto.randomString(20)}.com`
      };
      let res = await request(httpsServer)
        .post('/api/skin/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          skin: {
            name: newSkin.name,
            description: newSkin.description,
            pictures: newSkin.pictures,
            model: newSkin.model
          }
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject({ message: 'Created' });
      res = await request(httpsServer)
        .post('/api/skin/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });
      expect(res.body.skins.length).toEqual(i + 2);

      newSkin.id = res.body.skins[i + 1].id;

      expect(res.body.skins).toContainEqual(newSkin);
    }
  });
});
