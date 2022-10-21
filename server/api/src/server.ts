import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';

import { app } from './app';
import { logger } from './logger';

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
    '/run/secrets/api.privkey.pem',
    'utf8'
  );
  const certificate: string = fs.readFileSync(
    '/run/secrets/api.cert.pem',
    'utf8'
  );
  const ca: string = fs.readFileSync('/run/secrets/api.chain.pem', 'utf8');
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

  server.on('error', (error: ErrnoException) => {
    logger.error('Https server error');
    throw error;
  });
  server.on('listening', () => {
    logger.info('Https server started');
  });
  server.listen(normalizePort(port), hostname);
}

dotenv.config({ path: './config/.env' });
createHttpsServer(process.env.PORT, process.env.HOSTNAME);
