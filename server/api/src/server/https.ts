import https from 'https';
import fs from 'fs';

import { app } from '../app';
import { logger } from '../utils/logger.util';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

interface SSLCertificates {
  key: string;
  cert: string;
  ca: string;
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

function getSSLCertificates(): SSLCertificates {
  const privateKey: string = fs.readFileSync(
    '/tmp/.secrets/ssl/privkey1.pem',
    'utf8'
  );
  const certificate: string = fs.readFileSync(
    '/tmp/.secrets/ssl/cert1.pem',
    'utf8'
  );
  const ca: string = fs.readFileSync('/tmp/.secrets/ssl/chain1.pem', 'utf8');
  const certificates: SSLCertificates = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  return certificates;
}

function createHttpsServer(
  port: string | undefined,
  hostname: string | undefined
): void {
  const server: https.Server = https.createServer(getSSLCertificates(), app);

  process.on('SIGTERM', () => {
    server.close(() => {
      logger.info('Https server stopped');
    });
  });
  server.on('error', (error: ErrnoException) => {
    logger.error('Https server error');
    throw error;
  });
  server.on('listening', () => {
    logger.info('Https server started');
  });
  server.listen(normalizePort(port), hostname);
}

createHttpsServer(process.env.PORT, process.env.HOSTNAME);
