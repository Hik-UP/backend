import request from 'supertest';

import { httpsServer } from '../../../../server/https';
import { dbTest } from '../../../../models/test/test.model';
import { crypto } from '../../../../utils/cryptography.util';

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
  id: '',
  name: '',
  description: '',
  pictures: '',
  model: ''
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
    let res = await request(httpsServer)
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

    res = await request(httpsServer)
      .post('/api/skin/retrieve')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });

    Skin.id = res.body.skins[0].id;
    Skin.name = res.body.skins[0].name;
    Skin.description = res.body.skins[0].description;
    Skin.pictures = res.body.skins[0].pictures;
    Skin.model = res.body.skins[0].model;
  });
});

describe('POST /user/skin/locked', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/user/skin/locked')
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

describe('POST /user/skin/locked', () => {
  it('should return 201', async () => {
    for (let i = 0; i < 25; i += 1) {
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

      res = await request(httpsServer)
        .post('/api/user/skin/unlocked')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });
      expect(res.body.skins.length).toEqual(1);
      expect(res.body.skins).toContainEqual(Skin);

      res = await request(httpsServer)
        .post('/api/user/skin/locked')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.skins.length).toEqual(i + 1);

      newSkin.id = res.body.skins[i].id;

      expect(res.body.skins).toContainEqual(newSkin);
    }
  });
});
