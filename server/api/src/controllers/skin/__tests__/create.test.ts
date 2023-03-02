import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';
import { crypto } from '../../../utils/cryptography.util';

const method = 'post';
const route = '/api/skin/create';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          name: crypto.randomString(20),
          description: crypto.randomString(20),
          pictures: [`https://${crypto.randomString(20)}.com`],
          model: `https://${crypto.randomString(20)}.com`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    await mainTest.req.setAdmin(user.email);

    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          name: crypto.randomString(20),
          description: crypto.randomString(20),
          pictures: [`https://${crypto.randomString(20)}.com`],
          model: `https://${crypto.randomString(20)}.com`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          description: crypto.randomString(20),
          pictures: [`https://${crypto.randomString(20)}.com`],
          model: `https://${crypto.randomString(20)}.com`
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          name: crypto.randomString(20),
          pictures: [`https://${crypto.randomString(20)}.com`],
          model: `https://${crypto.randomString(20)}.com`
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          name: crypto.randomString(20),
          description: crypto.randomString(20),
          model: `https://${crypto.randomString(20)}.com`
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          name: crypto.randomString(20),
          description: crypto.randomString(20),
          pictures: [`https://${crypto.randomString(20)}.com`]
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {
          foo: 'bar'
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        skin: {}
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    for (let i = 0; i < 10; i += 1) {
      const skin = {
        id: '',
        name: crypto.randomString(20),
        description: crypto.randomString(20),
        pictures: [`https://${crypto.randomString(20)}.com`],
        model: `https://${crypto.randomString(20)}.com`
      };
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          skin: {
            name: skin.name,
            description: skin.description,
            pictures: skin.pictures,
            model: skin.model
          }
        });

      mainTest.verify.created(res);

      res = await request(httpsServer)
        .post('/api/skin/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });
      skin.id = res.body.skins[i + 1].id;
      expect(res.body.skins).toContainEqual(skin);
    }
  });
});
