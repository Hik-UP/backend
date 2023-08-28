import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';
import { crypto } from '../../../utils/cryptography.util';
import { ITrailTest } from '../../../tests/type.test';

const method = 'put';
const route = '/api/trail/update';
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
        trail: {
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
        trail: {
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          id: randomUUID(),
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
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
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
        trail: {}
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
    const trail = await mainTest.req.createTrail();
    const otherHikeDetails = {
      name: `${crypto.randomString(20)}`,
      address: `${crypto.randomString(20)}`,
      description: `${crypto.randomString(20)}`,
      pictures: [`https://${crypto.randomString(20)}.com`],
      latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
      longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12)),
      difficulty: Math.floor(Math.random() * 10),
      duration: Math.floor(Math.random() * 10),
      distance: Math.floor(Math.random() * 10),
      uphill: Math.floor(Math.random() * 10),
      downhill: Math.floor(Math.random() * 10),
      tools: [`${crypto.randomString(20)}`],
      relatedArticles: [`https://${crypto.randomString(20)}.com`],
      labels: [`${crypto.randomString(10)}`],
      geoJSON: `${crypto.randomString(20)}`
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
          id: trail.id,
          name: otherHikeDetails.name,
          address: otherHikeDetails.address,
          description: otherHikeDetails.description,
          pictures: otherHikeDetails.pictures,
          latitude: otherHikeDetails.latitude,
          longitude: otherHikeDetails.longitude,
          difficulty: otherHikeDetails.difficulty,
          duration: otherHikeDetails.duration,
          distance: otherHikeDetails.distance,
          uphill: otherHikeDetails.uphill,
          downhill: otherHikeDetails.downhill,
          tools: otherHikeDetails.tools,
          relatedArticles: otherHikeDetails.relatedArticles,
          labels: otherHikeDetails.labels,
          geoJSON: otherHikeDetails.geoJSON
        }
      });

    mainTest.verify.updated(res);
    trail.name = otherHikeDetails.name;
    trail.address = otherHikeDetails.address;
    trail.description = otherHikeDetails.description;
    trail.pictures = otherHikeDetails.pictures;
    trail.latitude = otherHikeDetails.latitude;
    trail.longitude = otherHikeDetails.longitude;
    trail.difficulty = otherHikeDetails.difficulty;
    trail.duration = otherHikeDetails.duration;
    trail.distance = otherHikeDetails.distance;
    trail.uphill = otherHikeDetails.uphill;
    trail.downhill = otherHikeDetails.downhill;
    trail.tools = otherHikeDetails.tools;
    trail.relatedArticles = otherHikeDetails.relatedArticles;
    trail.labels = otherHikeDetails.labels;
    trail.geoJSON = otherHikeDetails.geoJSON;

    res = await request(httpsServer)
      .post('/api/trail/retrieve')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        }
      });
    expect(res.body.trails).toContainEqual(trail);
  });
});
