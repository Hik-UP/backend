import express from 'express';

function createUserDataRoutes(): express.Router {
  const userDataRoutes: express.Router = express.Router();

  return userDataRoutes;
}

const userDataRoutes: express.Router = createUserDataRoutes();

export { userDataRoutes };
