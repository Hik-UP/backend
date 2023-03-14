import request from 'supertest';

import { httpsServer } from '../../server/https';
import { mainTest } from '../../tests/main.test';
import { crypto } from '../../utils/cryptography.util';

const method = 'post';
const route = '/api/trail/create';
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: ['ADMIN']
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          roles: ['ADMIN']
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {},
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.req.setAdmin(user.email);

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
          labels: [`${crypto.randomString(10)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.created(res);
  });
});
