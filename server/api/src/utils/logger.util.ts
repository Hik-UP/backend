import winston from 'winston';

function createLogger(): winston.Logger {
  const logsFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YY HH:mm:ss'
    }),
    winston.format.printf(
      (info) => `[${info.level}]	${info.timestamp}	${info.message}`
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

const logger: winston.Logger = createLogger();

export { logger };
