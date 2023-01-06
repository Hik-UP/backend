/* istanbul ignore file */
import http from 'http';

import { app } from '../app';
import { normalizePort } from '../utils/normalizePort.util';
import { logger } from '../utils/logger.util';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

function createHttpServer(
  port: string | undefined,
  hostname: string | undefined
): http.Server {
  const server: http.Server = http.createServer(app);

  server.on('error', (error: ErrnoException) => {
    logger.error('Https server error');
    throw error;
  });
  server.on('listening', () => {
    logger.info('Test http server started');
  });
  return server.listen(normalizePort(port), hostname);
}

const testHttpServer: http.Server = createHttpServer(
  process.env.API_PORT,
  process.env.API_HOSTNAME
);

export { testHttpServer };
