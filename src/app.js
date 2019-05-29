import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/Router';
import { logger } from './config/logger';

const { secretString } = require('./config/app_constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
logger.debug('bodyParsers have been set.');

app.use((req, res, next) => {
  req.secretString = secretString;
  req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
logger.debug('CORS Enabled.');

app.use('/api', router);
logger.debug('Routers set.');

app.use((err, req, res, next) => {
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ status: 'failed',
  msg: err.message });
  next();
});
logger.info('API is ready to go.');
module.exports = app;
