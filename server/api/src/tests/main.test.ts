/* istanbul ignore file */
import { httpsServer } from '../server/https';
import { vars } from './vars.test';
import { db } from './db.test';
import { req } from './req.test';
import { verify } from './verify.test';

beforeAll(async () => {
  await db.removeAllPOI();
  await db.removeAllHikes();
  await db.removeAllTrails();
  await db.removeAllUsers();
  await db.removeAllSkins();

  await db.createDefaultSkin();
  await req.createDefaultUser();
});

afterAll(async () => {
  httpsServer.close();

  await db.removeAllPOI();
  await db.removeAllHikes();
  await db.removeAllTrails();
  await db.removeAllUsers();
  await db.removeAllSkins();
});

const mainTest = {
  vars,
  db,
  req,
  verify
};

export { mainTest };
