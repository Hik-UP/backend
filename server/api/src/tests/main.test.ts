/* istanbul ignore file */
import { httpsServer } from '../server/https';
import { vars } from './vars.test';
import { db } from './db.test';
import { req } from './req.test';
import { verify } from './verify.test';
import { socket } from './sockets/socket.test';

beforeAll(async () => {
  await db.removeAllPOI();
  await db.removeAllStats();
  await db.removeAllHikes();
  await db.removeAllTrailComments();
  await db.removeAllTrails();
  await db.removeAllNotifications();
  await db.removeAllUsers();
  await db.removeAllSkins();

  await db.createDefaultSkin();
  await req.createDefaultUser();

  socket.req.createDefaultSocket();
});

afterAll(async () => {
  socket.req.closeDefaultSocket();
  httpsServer.close();

  await db.removeAllPOI();
  await db.removeAllStats();
  await db.removeAllHikes();
  await db.removeAllTrailComments();
  await db.removeAllTrails();
  await db.removeAllNotifications();
  await db.removeAllUsers();
  await db.removeAllSkins();
});

const mainTest = {
  vars,
  db,
  req,
  verify,
  socket
};

export { mainTest };
