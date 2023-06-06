import https from 'https';
import fs from 'fs';

import { app } from '../app';
import { socket } from '../socket';
import { normalizePort } from '../utils/normalizePort.util';
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
): https.Server {
  const server: https.Server = https.createServer(getSSLCertificates(), app);

  process.on('SIGTERM', () => {
    server.close(() => {
      logger.api.info('Https server stopped');
    });
  });
  server.on('error', (error: ErrnoException) => {
    throw error;
  });
  server.on('listening', () => {
    logger.api.info('Https server started');
  });
  server.listen(normalizePort(port), hostname);
  return server;
}

const httpsServer: https.Server = createHttpsServer(
  process.env.API_PORT,
  process.env.API_HOSTNAME
);

socket.attach(httpsServer, {
  cors: {
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

export { httpsServer };
