import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { ITrailCommentTest } from '../../../../tests/type.test';

const method = 'put';
const route = '/api/user/notification/update';
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
        notification: {
          id: randomUUID(),
          read: true
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
        notification: {
          read: true
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
        notification: {
          id: randomUUID()
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
        notification: {}
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
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        notification: {
          id: randomUUID(),
          read: true,
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
        notification: {
          foo: 'bar'
        }
      });

    mainTest.verify.badRequest(res);
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
        notification: {
          id: randomUUID(),
          read: true
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.req.setAdmin(user.email);

    const otherUser = await mainTest.req.createUser();

    for (let i = 0; i < 10; i += 1) {
      await mainTest.req.createHike([{ email: otherUser.email }]);
      const otherNotificationDetails = {
        read: true
      };
      let res = await request(httpsServer)
        .post('/api/user/notification/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          }
        });
      const notification = res.body.notifications[0];

      res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          },
          notification: {
            id: notification.id,
            read: otherNotificationDetails.read
          }
        });
      mainTest.verify.updated(res);
      notification.read = otherNotificationDetails.read;

      res = await request(httpsServer)
        .post('/api/user/notification/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          }
        });
      const retrievedNotification: ITrailCommentTest =
        res.body.notifications.find(
          (value: ITrailCommentTest) => value.id === notification.id
        );
      expect(retrievedNotification).toEqual(notification);
    }
  });
});
