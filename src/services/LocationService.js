import LocationDao from '../dao/LocationDao';
import { logger } from '../config/logger';

class LocationService {

  getAllLocationDetails() {
    logger.debug('Calling DAO for fetching all location details.');
    logger.info('Fetching all Location Details');
    return new Promise((resolve, reject) => {
      new LocationDao().getAllLocationDetails()
      .then(result => {
        logger.debug('Resolving location details to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  addNewLocation(locParams, files) {
    logger.debug('Calling DAO for adding new location.');
    logger.info(`Adding new location ${locParams.LOC_POSTAL_CODE}`);
    console.log('locParams', locParams);
    return new Promise((resolve, reject) => {
      new LocationDao().addNewLocation(locParams, files)
      .then(result => {
        logger.debug('Resolving location add response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  editLocation(locParams) {
    logger.debug('Calling DAO for updating location.');
    logger.info(`Updating location ${locParams.LOC_ID}`);
    return new Promise((resolve, reject) => {
      new LocationDao().editLocation(locParams)
      .then(result => {
        logger.debug('Resolving location update response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  deleteLocation(LOC_ID) {
    logger.debug('Calling DAO for deleting location.');
    logger.info(`Deleting location ${LOC_ID}`);
    return new Promise((resolve, reject) => {
      new LocationDao().deleteLocation(LOC_ID)
      .then(result => {
        logger.debug('Resolving location delete response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }
}

export default LocationService;
