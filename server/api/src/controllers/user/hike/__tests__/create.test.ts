import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { crypto } from '../../../../utils/cryptography.util';
import { IHikeTest } from '../../../../tests/type.test';

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
    const trail = await mainTest.req.createTrail();
    const otherUser = await mainTest.req.createUser();
    const hike = {
      id: '',
      name: `${crypto.randomString(20)}`,
      description: `${crypto.randomString(20)}`,
      trail: trail,
      organizers: [{ username: user.username, picture: user.picture }],
      attendees: [{ username: user.username, picture: user.picture }],
      guests: [{ username: otherUser.username, picture: otherUser.picture }],
      stats: [
        {
          completed: false,
          distance: 0,
          steps: 0,
          user: { username: user.username, picture: user.picture }
        }
      ],
      status: 'IN_PROGRESS',
      schedule: new Date(),
      createdAt: new Date()
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
          description: hike.description,
          guests: [{ email: otherUser.email }]
        }
      });

    mainTest.verify.created(res);

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
    hike.id = res.body.hikes.guest[0].id;
    hike.schedule = res.body.hikes.guest[0].schedule;
    hike.createdAt = res.body.hikes.guest[0].createdAt;
    expect(res.body.hikes.organized.length).toEqual(0);
    expect(res.body.hikes.attendee.length).toEqual(0);
    expect(res.body.hikes.guest.length).toEqual(1);
    expect(res.body.hikes.guest).toContainEqual(hike);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.db.removeAllStats();
    await mainTest.db.removeAllHikes();

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
        stats: [
          {
            completed: false,
            distance: 0,
            steps: 0,
            user: { username: user.username, picture: user.picture }
          }
        ],
        status: 'IN_PROGRESS',
        schedule: new Date(),
        createdAt: new Date()
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
      const retrievedHike: IHikeTest = res.body.hikes.organized.find(
        (value: IHikeTest) => value.name === hike.name
      );
      hike.id = retrievedHike.id;
      hike.schedule = retrievedHike.schedule;
      hike.createdAt = retrievedHike.createdAt;
      expect(res.body.hikes.organized).toContainEqual(hike);
      expect(res.body.hikes.attendee).toContainEqual(hike);
      expect(res.body.hikes.guest).toEqual([]);
    }
  });
});
