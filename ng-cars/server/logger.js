/**
 * Configurations of logger.
 */
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const consoleConfig = [
  new winston.transports.Console({
    'colorize': true
  })
];

const fileConfig = [
  new winston.transports.File({
    name: 'info-file',
    filename: 'filelog-info.log',
    level: 'info'
  }),
  new winston.transports.File({
    name: 'error-file',
    filename: 'filelog-error.log',
    level: 'error'
  })
];

const createLogger = new winston.Logger({
  'transports': consoleConfig
});

const successLogger = createLogger;
successLogger.add(winstonRotator, {
  'name': 'access-file',
  'level': 'info',
  'filename': './logs/access.log',
  'json': false,
  'datePattern': 'yyyy-MM-dd-',
  'prepend': true
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
  'name': 'error-file',
  'level': 'error',
  'filename': './logs/error.log',
  'json': false,
  'datePattern': 'yyyy-MM-dd-',
  'prepend': true
});

module.exports = {
  'successlog': successLogger,
  'errorlog': errorLogger
};
