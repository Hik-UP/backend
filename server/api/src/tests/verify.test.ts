/* istanbul ignore file */
import request from 'supertest';

function created(res: request.Response) {
  expect(res.statusCode).toEqual(201);
  expect(res.body).toMatchObject({ message: 'Created' });
}

function ok(res: request.Response) {
  expect(res.statusCode).toEqual(200);
}

function updated(res: request.Response) {
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual('Updated');
}

function deleted(res: request.Response) {
  expect(res.statusCode).toEqual(200);
  expect(res.body).toMatchObject({ message: 'Deleted' });
}

function unauthorized(res: request.Response) {
  expect(res.statusCode).toEqual(401);
  expect(res.body).toMatchObject({ error: 'Unauthorized' });
}

function badRequest(res: request.Response) {
  expect(res.statusCode).toEqual(400);
  expect(res.body).toMatchObject({ error: 'Bad Request' });
}

function tooManyRequests(res: request.Response) {
  expect(res.statusCode).toEqual(429);
  expect(res.body).toMatchObject({ error: 'Too Many Requests' });
}

function internalServerError(res: request.Response) {
  expect(res.statusCode).toEqual(500);
  expect(res.body).toMatchObject({ error: 'Internal Server Error' });
}

const verify = {
  created,
  ok,
  updated,
  deleted,
  unauthorized,
  badRequest,
  tooManyRequests,
  internalServerError
};

export { verify };
