import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { crypto } from '../../../../utils/cryptography.util';

const method = 'post';
const route = '/api/user/hike/create';
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
        trail: {
          id: randomUUID()
        },
        hike: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        trail: {
          id: randomUUID()
        },
        hike: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        trail: {
          foo: 'bar'
        },
        hike: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        trail: {
          foo: 'bar'
        },
        hike: {
          description: `${crypto.randomString(20)}`
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
        trail: {
          foo: 'bar'
        },
        hike: {
          name: `${crypto.randomString(20)}`
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
        trail: {
          foo: 'bar'
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
        trail: {
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
        trail: {
          id: randomUUID()
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
    await mainTest.req.setAdmin(user.email);

    const trail = await mainTest.req.createTrail();
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: trail.id
        },
        hike: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          guests: [{ email: user.email }]
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    for (let i = 0; i < 10; i += 1) {
      const trail = await mainTest.req.createTrail();
      const hike = {
        id: '',
        name: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        trail: trail,
        organizers: [{ username: user.username, picture: user.picture }],
        attendees: [{ username: user.username, picture: user.picture }],
        guests: [],
        schedule: '',
        createdAt: ''
      };
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          trail: {
            id: trail.id
          },
          hike: {
            name: hike.name,
            description: hike.description
          }
        });

      mainTest.verify.created(res);

      res = await request(httpsServer)
        .post('/api/user/hike/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });
      hike.id = res.body.hikes.organized[i].id;
      hike.schedule = res.body.hikes.organized[i].schedule;
      hike.createdAt = res.body.hikes.organized[i].createdAt;
      expect(res.body.hikes.organized).toContainEqual(hike);
      expect(res.body.hikes.attendee).toContainEqual(hike);
      expect(res.body.hikes.guest).toEqual([]);
    }
  });
});
