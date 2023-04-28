import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { crypto } from '../../../../utils/cryptography.util';
import { ITrailTest } from '../../../../tests/type.test';

const method = 'put';
const route = '/api/trail/comment/update';
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
        comment: {
          id: randomUUID(),
          body: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`]
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
        comment: {
          body: `${crypto.randomString(20)}`,
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
        comment: {
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
        comment: {}
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
        comment: {
          id: randomUUID(),
          body: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
        comment: {
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
        comment: {
          id: randomUUID(),
          body: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`]
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      const { comment, trail } = await mainTest.req.createTrailComment();
      const otherCommentDetails = {
        body: `${crypto.randomString(20)}`,
        pictures: [`https://${crypto.randomString(20)}.com`]
      };
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          comment: {
            id: comment.id,
            body: otherCommentDetails.body,
            pictures: otherCommentDetails.pictures
          }
        });

      mainTest.verify.updated(res);
      comment.body = otherCommentDetails.body;
      comment.pictures = otherCommentDetails.pictures;

      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });
      const retrievedTrail: ITrailTest = res.body.trails.find(
        (value: ITrailTest) => value.name === trail.name
      );
      expect(retrievedTrail.comments).toContainEqual(comment);
    }
  });
});
