import log4js from 'log4js';

log4js.configure({
  appenders: { app: { type: 'stdout' } },
  categories: { default: { appenders: ['app'], level: process.env.loglevel } }
});
const logger = log4js.getLogger('app');

export { logger };
