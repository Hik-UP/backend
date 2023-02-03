import http from 'http';

import { app } from '../app';
import { logger } from '../utils/logger.util';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

function normalizePort(value: string | undefined): number | undefined {
  const port: number | undefined = parseInt(value || '', 10);

  if (isNaN(port)) {
    return undefined;
  }
  if (port >= 0) {
    return port;
  }
  return undefined;
}

function createHttpServer(
  port: string | undefined,
  hostname: string | undefined
): void {
  const server: http.Server = http.createServer(app);

  server.on('error', (error: ErrnoException) => {
    logger.error('Https server error');
    throw error;
  });
  server.on('listening', () => {
    logger.info('Http server started');
  });
  server.listen(normalizePort(port), hostname);
}

createHttpServer(process.env.PORT, process.env.HOSTNAME);
