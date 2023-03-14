import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../../server/https';
import { mainTest } from '../../../../../tests/main.test';
import { crypto } from '../../../../../utils/cryptography.util';

const method = 'put';
const route = '/api/user/hike/organizer/update';
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
        hike: {
          id: randomUUID(),
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
          id: randomUUID(),
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
        hike: {
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
          id: randomUUID()
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
          id: randomUUID()
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

    const hike = await mainTest.req.createHike();
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: hike.id,
          attendees: {
            remove: [{ email: user.email }]
          }
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const hike = await mainTest.req.createHike();
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: hike.id,
          guests: {
            add: [{ email: user.email }]
          }
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const otherUser = await mainTest.req.createUser();
    const hike = await mainTest.req.createHike([{ email: otherUser.email }]);
    let res = await request(httpsServer)
      .put('/api/user/hike/guest/accept')
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

    res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: hike.id,
          guests: {
            add: [{ email: otherUser.email }]
          }
        }
      });
    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const hike = await mainTest.req.createHike([{ email: otherUser.email }]);
    let res = await request(httpsServer)
      .put('/api/user/hike/guest/accept')
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

    res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: hike.id,
          attendees: {
            remove: [{ email: otherUser.email }]
          }
        }
      });
    mainTest.verify.updated(res);

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
    expect(res.body.hikes.organized[0].organizers.length).toEqual(1);
    expect(res.body.hikes.organized[0].attendees.length).toEqual(1);
    expect(res.body.hikes.organized[0].guests.length).toEqual(0);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const hike = await mainTest.req.createHike([{ email: otherUser.email }]);
    let res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        hike: {
          id: hike.id,
          guests: {
            remove: [{ email: otherUser.email }]
          }
        }
      });

    mainTest.verify.updated(res);

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
    expect(res.body.hikes.organized[0].organizers.length).toEqual(1);
    expect(res.body.hikes.organized[0].attendees.length).toEqual(1);
    expect(res.body.hikes.organized[0].guests.length).toEqual(0);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const trail = await mainTest.req.createTrail();
    const hike = await mainTest.req.createHike([{ email: otherUser.email }]);
    const otherHikeDetails = {
      name: `${crypto.randomString(20)}`,
      description: `${crypto.randomString(20)}`
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
          id: hike.id,
          name: otherHikeDetails.name,
          description: otherHikeDetails.description,
          guests: {
            remove: [{ email: otherUser.email }]
          }
        }
      });

    mainTest.verify.updated(res);
    hike.name = otherHikeDetails.name;
    hike.description = otherHikeDetails.description;
    hike.trail = trail;
    hike.guests = [];

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
    expect(res.body.hikes.organized).toContainEqual(hike);
  });
});
