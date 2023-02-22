import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
});

function generateRandomLetter() {
  const alphabet = 'MF';

  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: '',
  sex: generateRandomLetter(),
  weight: Math.floor(Math.random() * (200 - 60) + 60),
  tall: Math.floor(Math.random() * (200 - 90) + 90),
  age: Math.floor(Math.random() * (100 - 20) + 20)
};

const Trail = {
  id: '',
  name: `${crypto.randomString(20)}`,
  address: `${crypto.randomString(20)}`,
  description: `${crypto.randomString(20)}`,
  pictures: [`https://${crypto.randomString(20)}.com`],
  latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
  longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
  difficulty: Math.floor(Math.random() * 10),
  duration: Math.floor(Math.random() * 10),
  distance: Math.floor(Math.random() * 10),
  uphill: Math.floor(Math.random() * 10),
  downhill: Math.floor(Math.random() * 10),
  tools: [`${crypto.randomString(20)}`],
  relatedArticles: [`https://${crypto.randomString(20)}.com`],
  labels: [`${crypto.randomString(10)}`],
  geoJSON: `${crypto.randomString(20)}`,
  comments: []
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user.id).toBe('string');
    expect(res.body.user.roles).toEqual(['ADMIN']);
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /trail/details', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age,
          weight: User.weight,
          tall: User.tall,
          sex: User.sex
        },
        trail: {
          id: '0',
          latitude: 4,
          longitude: 4,
          duration: 4
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains only weight of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains only tall of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains only sex of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          sex: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains only age of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains weight, tall, sex without age of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          tall: User.tall,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains weight, tall without age and sex of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          tall: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains age, sex without weigth and tall of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains age, sex, tall without weight
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains age, sex, weight without tall
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains user without trail property
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains user , and no id in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

//When body contains user, and trail object but sex not equal to F or M
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: 'P'
        },
        trail: {
          id: Trail.id
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /trail/details', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: randomUUID()
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /trail/details', () => {
  jest.setTimeout(60000);
  it('should return 201', async () => {
    await dbTest.removeAllTrails();
    for (let i = 0; i < 25; i += 1) {
      const newUserDetails = {
        sex: generateRandomLetter(),
        weight: Math.floor(Math.random() * (200 - 60) + 60),
        tall: Math.floor(Math.random() * (200 - 90) + 90),
        age: Math.floor(Math.random() * (100 - 20) + 20)
      };
      const newTrail = {
        id: '',
        name: `${crypto.randomString(20)}`,
        address: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`https://${crypto.randomString(20)}.com`],
        latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
        longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
        difficulty: Math.floor(Math.random() * 10),
        duration: Math.floor(Math.random() * 10),
        distance: Math.floor(Math.random() * 10),
        uphill: Math.floor(Math.random() * 10),
        downhill: Math.floor(Math.random() * 10),
        tools: [`${crypto.randomString(20)}`],
        relatedArticles: [`https://${crypto.randomString(20)}.com`],
        labels: [`${crypto.randomString(10)}`],
        geoJSON: `${crypto.randomString(20)}`,
        comments: []
      };
      let res = await request(httpsServer)
        .post('/api/trail/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: {
            name: newTrail.name,
            address: newTrail.address,
            description: newTrail.description,
            pictures: newTrail.pictures,
            latitude: newTrail.latitude,
            longitude: newTrail.longitude,
            difficulty: newTrail.difficulty,
            duration: newTrail.duration,
            distance: newTrail.distance,
            uphill: newTrail.uphill,
            downhill: newTrail.downhill,
            tools: newTrail.tools,
            relatedArticles: newTrail.relatedArticles,
            labels: newTrail.labels,
            geoJSON: newTrail.geoJSON
          }
        });

      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });
      newTrail.id = res.body.trails[i].id;
      newTrail.comments = res.body.trails[i].comments;

      res = await request(httpsServer)
        .post('/api/trail/details')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles,
            weight: newUserDetails.weight,
            tall: newUserDetails.tall,
            sex: newUserDetails.sex,
            age: newUserDetails.age
          },
          trail: {
            id: newTrail.id
          }
        });

      const BMT =
        newUserDetails.sex === 'M'
          ? 10 * newUserDetails.weight +
            6.25 * newUserDetails.tall -
            5 * newUserDetails.age +
            5
          : 10 * newUserDetails.weight +
            6.25 * newUserDetails.tall -
            5 * newUserDetails.age -
            161;

      const calories = 5 * BMT * newTrail.duration;

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.weather.temperature).toBe('number');
      expect(typeof res.body.weather.icon).toBe('string');
      expect(typeof res.body.calories).toBe('number');
      expect(res.body.calories === calories).toBeTruthy();
    }
  });
});
