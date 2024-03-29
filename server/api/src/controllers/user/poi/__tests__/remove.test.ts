import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';

const method = 'delete';
const route = '/api/user/poi/remove';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: randomUUID()
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
        poi: {}
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
        poi: {
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
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    await mainTest.db.removeAllPOI();
    await mainTest.req.setAdmin(user.email);

    const otherUser = await mainTest.req.createUser();

    for (let i = 0; i < 5; i += 1) {
      const poi = await mainTest.req.createPOI([{ email: otherUser.email }]);
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          poi: {
            id: poi.id
          }
        });

      mainTest.verify.deleted(res);

      res = await request(httpsServer)
        .post('/api/user/poi/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          poi: {
            target: ['created', 'shared']
          }
        });
      expect(res.body.poi.created.length).toEqual(0);
      expect(res.body.poi.shared.length).toEqual(0);

      res = await request(httpsServer)
        .post('/api/user/poi/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          poi: {
            target: ['created', 'shared']
          }
        });
      expect(res.body.poi.created.length).toEqual(i + 1);
      expect(res.body.poi.shared.length).toEqual(0);
    }
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    await mainTest.db.removeAllPOI();

    const otherUser = await mainTest.req.createUser();

    for (let i = 0; i < 5; i += 1) {
      const poi = await mainTest.req.createPOI([{ email: otherUser.email }]);
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          poi: {
            id: poi.id
          }
        });

      mainTest.verify.deleted(res);

      res = await request(httpsServer)
        .post('/api/user/poi/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          poi: {
            target: ['created', 'shared']
          }
        });
      expect(res.body.poi.created.length).toEqual(0);
      expect(res.body.poi.shared.length).toEqual(0);

      res = await request(httpsServer)
        .post('/api/user/poi/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          poi: {
            target: ['created', 'shared']
          }
        });
      expect(res.body.poi.created.length).toEqual(0);
      expect(res.body.poi.shared.length).toEqual(0);
    }
  });
});
