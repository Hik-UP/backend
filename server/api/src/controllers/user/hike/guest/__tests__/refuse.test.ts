import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../../server/https';
import { mainTest } from '../../../../../tests/main.test';

const method = 'put';
const route = '/api/user/hike/guest/refuse';
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
        hike: {
          id: randomUUID()
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: randomUUID()
        }
      });

    mainTest.verify.internalServerError(res);
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
        hike: {}
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
        hike: {
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
    const otherUser = await mainTest.req.createUser();

    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      const hike = await mainTest.req.createHike([{ email: otherUser.email }]);
      let res = await request(httpsServer)
        .post('/api/user/hike/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });

      expect(res.body.hikes.organized.length).toEqual(0);
      expect(res.body.hikes.attendee.length).toEqual(0);
      expect(res.body.hikes.guest.length).toEqual(1);
      expect(res.body.hikes.guest).toContainEqual(hike);

      res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          hike: {
            id: hike.id
          }
        });
      mainTest.verify.updated(res);

      res = await request(httpsServer)
        .post('/api/user/hike/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });
      expect(res.body.hikes.organized.length).toEqual(0);
      expect(res.body.hikes.attendee.length).toEqual(0);
      expect(res.body.hikes.guest.length).toEqual(0);
    }
  });
});
