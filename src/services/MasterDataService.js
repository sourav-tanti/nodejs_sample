import MasterDataDao from '../dao/MasterDataDao';
import { logger } from '../config/logger';

class MasterDataService {

  // Genus
  getAllGenusData() {
    logger.debug('Calling DAO for fetching all genus details.');
    logger.info('Fetching all Genus Details');
    return new Promise((resolve, reject) => {
      new MasterDataDao().getAllGenusData()
      .then(result => {
        logger.debug('Resolving genus details to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  addNewGenusData(genusParams) {
    logger.debug('Calling DAO for adding new genus.');
    logger.info(`Adding new genus ${genusParams.MG_GENUS_NAME}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().addNewGenusData(genusParams)
      .then(result => {
        logger.debug('Resolving genus add response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  editGenusData(genusParams) {
    logger.debug('Calling DAO for updating genus.');
    logger.info(`Updating genus ${genusParams.MG_ID}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().editGenusData(genusParams)
      .then(result => {
        logger.debug('Resolving genus update response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  deleteGenusData(MG_ID) {
    logger.debug('Calling DAO for deleting genus.');
    logger.info(`Deleting genus ${MG_ID}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().deleteGenusData(MG_ID)
      .then(result => {
        logger.debug('Resolving genus delete response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  // Country
  getAllCountryData() {
    logger.debug('Calling DAO for fetching all country details.');
    logger.info('Fetching all Country Details');
    return new Promise((resolve, reject) => {
      new MasterDataDao().getAllCountryData()
      .then(result => {
        logger.debug('Resolving country details to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  addNewCountryData(countryParams) {
    logger.debug('Calling DAO for adding new country.');
    logger.info(`Adding new country - STATE ${countryParams.MC_COUNTRY}-${countryParams.MC_STATE}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().addNewCountryData(countryParams)
      .then(result => {
        logger.debug('Resolving country add response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  editCountryData(countryParams) {
    logger.debug('Calling DAO for updating country.');
    logger.info(`Updating country ${countryParams.MG_ID}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().editCountryData(countryParams)
      .then(result => {
        logger.debug('Resolving country update response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  deleteCountryData(MC_ID) {
    logger.debug('Calling DAO for deleting country.');
    logger.info(`Deleting country ${MC_ID}`);
    return new Promise((resolve, reject) => {
      new MasterDataDao().deleteCountryData(MC_ID)
      .then(result => {
        logger.debug('Resolving country delete response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }
}

export default MasterDataService;
