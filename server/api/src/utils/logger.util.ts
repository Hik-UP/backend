import winston from 'winston';

function createApiLogger(): winston.Logger {
  const logsFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YY HH:mm:ss'
    }),
    winston.format.printf(
      (info) => `[${info.level}]	${info.timestamp}	API:    ${info.message}`
    ),
    winston.format.colorize({
      all: true
    })
  );
  const winstonLogger: winston.Logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), logsFormat)
      })
    ]
  });

  return winstonLogger;
}

function createSocketLogger(): winston.Logger {
  const logsFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YY HH:mm:ss'
    }),
    winston.format.printf(
      (info) => `[${info.level}]	${info.timestamp}	SOCKET: ${info.message}`
    ),
    winston.format.colorize({
      all: true
    })
  );
  const winstonLogger: winston.Logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), logsFormat)
      })
    ]
  });

  return winstonLogger;
}

const logger: { api: winston.Logger; socket: winston.Logger } = {
  api: createApiLogger(),
  socket: createSocketLogger()
};

export { logger };
