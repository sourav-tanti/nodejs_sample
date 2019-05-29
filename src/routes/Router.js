import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import { logger } from '../config/logger';
import TokenController from '../controllers/TokenController';
import UserController from '../controllers/UserController';
import TreeController from '../controllers/TreeController';
import MasterDataController from '../controllers/MasterDataController';
import LocationController from '../controllers/LocationController';
import { upload } from '../config/store';

const router = express.Router();

router.get('/', (req, res) => {
  logger.info(`Request received on '${req.url}' from ${req.clientIp} `);
  res.send({ Status: 'Welcome' });
  logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
});

router.post('/prof', upload.array('photos'), (req, res) => {
  logger.info('File has been uploaded successfully.');
  console.log('request object', req.body);
  console.log('response object', res.req.files);
  res.send({ status: 'successful', msg: 'File Uploaded' });
  logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
});

router.get('/imagedata', (req, res) => {
  logger.info(`Request received on '${req.url}' from ${req.clientIp} `);
  const fileName = `${process.env.imagepath}/20180820_214117_rf123.jpg`;
  res.send({ file: new Buffer(fs.readFileSync(fileName)).toString('base64') });
});

router.post('/authenticate', (req, res) => {
  logger.info(`Request received on '${req.url}' from ${req.clientIp} `);
  new TokenController().authenticateUser(req, res, () => {
    logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
  });
});

// token verification
router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  logger.info(`Processing token for '${req.url}' from ${req.clientIp}`);
  if (token) {
    jsonwebtoken.verify(token, req.secretString, (err, decoded) => {
      if (err) {
        logger.info(`Invalid token received for '${req.url}' from ${req.clientIp}`);
        return res.status(401).send({
          status: 'failed',
          msg: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;
        logger.info(`Token Verified. Processing request for '${req.url}' from ${req.clientIp}`);
        next();
      });
    } else {
      logger.info(`No token found for '${req.url}' from ${req.clientIp}`);
      return res.status(403).send({
        status: 'failed',
        msg: 'No token provided'
      });
    }
  });

  router.get('/keys', (req, res) => {
    res.send({ MSG: 'token passed.' });
  });

  router.post('/validateuser', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new UserController().validateUser(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.get('/trees', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new TreeController().getAllTreeDetails(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.post('/trees', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new TreeController().addNewTree(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.put('/trees', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.t_id) {
      new TreeController().editTree(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.delete('/trees', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.t_id) {
      new TreeController().deleteTree(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.get('/genuses', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new MasterDataController().getAllGenusData(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.post('/genuses', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new MasterDataController().addNewGenusData(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.put('/genuses', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.MG_ID) {
      new MasterDataController().editGenusData(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.delete('/genuses', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.MG_ID) {
      new MasterDataController().deleteGenusData(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.get('/countries', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new MasterDataController().getAllCountryData(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.post('/countries', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new MasterDataController().addNewCountryData(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.put('/countries', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.MC_ID) {
      new MasterDataController().editCountryData(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.delete('/countries', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.MC_ID) {
      new MasterDataController().deleteCountryData(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.get('/locations', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new LocationController().getAllLocationDetails(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.post('/locations', upload.array('file', 5), (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    new LocationController().addNewLocation(req, res, () => {
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    });
  });

  router.put('/locations', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.LOC_ID) {
      new LocationController().editLocation(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.delete('/locations', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    if (req.body.LOC_ID) {
      new LocationController().deleteLocation(req, res, () => {
        logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
      });
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  router.patch('/photos', (req, res) => {
    logger.info(`${req.method} Request received on '${req.url}' from ${req.clientIp} `);
    const photoNames = req.body.names;
    if (photoNames && photoNames.length > 0) {
      const photosObject = {};
      photoNames.forEach(photo => {
        photosObject[photo.split('.')[0]] = new Buffer(
          fs.readFileSync(`${process.env.imagepath}/${photo}`)).toString('base64');
      });

      res.send({
        status: 'success',
        msg: 'images fetched',
        images: photosObject
      });
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    } else {
      res.status(400).send({ status: 'failed', msg: 'request not formatted well' });
      logger.info('Request Body is not formatted well.');
      logger.info(`'${req.url}' served for ${req.clientIp}: Response sent. `);
    }
  });

  export { router };
