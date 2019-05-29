import LocationService from '../services/LocationService';
import { logger } from '../config/logger';

class LocationController {

  getAllLocationDetails(req, res, cb) {
    new LocationService().getAllLocationDetails().then(locations => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'location details fetched',
        locations
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  addNewLocation(req, res, cb) {
    new LocationService().addNewLocation(req.body, res.req.files).then(result => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'tree added',
        newId: result.insertId,
        locations: result.locations
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  editLocation(req, res, cb) {
    new LocationService().editLocation(req.body).then(locations => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'location updated',
        locations
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  deleteLocation(req, res, cb) {
    new LocationService().deleteLocation(req.body.LOC_ID).then(locations => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'location deleted',
        locations
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }
}

export default LocationController;
