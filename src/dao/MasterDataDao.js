import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

class MasterDataDao {

  // Genus
  getAllGenusData() {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT * FROM TIS_MASTER_GENUS';
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to fetch genus details' });
        if (results.length >= 0) {
          logger.info('Genus Details have been fetched.');
          resolve(results);
        }
      });
    });
  }

  addNewGenusData({
    MG_GENUS_NAME,
    MG_SPECIES_NAME,
    MG_FAMILY,
    MG_ORDER,
    MG_CLASS
  }) {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO
                            TIS_MASTER_GENUS(
                            	MG_GENUS_NAME,
                            	MG_SPECIES_NAME,
                            	MG_FAMILY,
                            	MG_ORDER,
                            	MG_CLASS
                            ) VALUES (
                            	'${MG_GENUS_NAME}',
                            	'${MG_SPECIES_NAME}',
                            	'${MG_FAMILY}',
                            	'${MG_ORDER}',
                            	'${MG_CLASS}'
                            )`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.insertId) {
          logger.info(`New Genus details have been added with ID ${results.insertId}`);
          this.getAllGenusData().then(res => {
            resolve({ insertId: results.insertId, genuses: res });
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'Unable to insert new genus' });
        }
      });
    });
  }

  editGenusData({
    MG_ID,
    MG_GENUS_NAME,
    MG_SPECIES_NAME,
    MG_FAMILY,
    MG_ORDER,
    MG_CLASS
  }) {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE TIS_MASTER_GENUS
                          SET
                            MG_GENUS_NAME='${MG_GENUS_NAME}',
                            MG_SPECIES_NAME='${MG_SPECIES_NAME}',
                            MG_FAMILY='${MG_FAMILY}',
                            MG_ORDER='${MG_ORDER}',
                            MG_CLASS='${MG_CLASS}'
                          WHERE
                            MG_ID=${MG_ID}`;

      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to update details' });
        if (results.affectedRows === 1) {
          logger.info('Genus Details have been updated.');
          this.getAllGenusData().then(genuses => {
            resolve(genuses);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to update genus details' });
        }
      });
    });
  }

  deleteGenusData(MG_ID) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM TIS_MASTER_GENUS WHERE MG_ID=${MG_ID}`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to delete genus' });
        if (results.affectedRows === 1) {
          logger.info('Genus Details have been deleted.');
          this.getAllGenusData().then(genuses => {
            resolve(genuses);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to delete genus' });
        }
      });
    });
  }

  // Country
  getAllCountryData() {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT * FROM TIS_MASTER_COUNTRY';
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to fetch Country details' });
        if (results.length >= 0) {
          logger.info('Country Details have been fetched.');
          resolve(results);
        }
      });
    });
  }

  addNewCountryData({
    MC_COUNTRY,
    MC_STATE
  }) {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO
                            TIS_MASTER_COUNTRY(
                            	MC_COUNTRY,
                            	MC_STATE
                            ) VALUES (
                            	'${MC_COUNTRY}',
                            	'${MC_STATE}'
                            )`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.insertId) {
          logger.info(`New Country details have been added with ID ${results.insertId}`);
          this.getAllCountryData().then(res => {
            resolve({ insertId: results.insertId, countries: res });
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'Unable to insert new country' });
        }
      });
    });
  }

  editCountryData({
    MC_ID,
    MC_COUNTRY,
    MC_STATE
  }) {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE TIS_MASTER_COUNTRY
                          SET
                            MC_COUNTRY='${MC_COUNTRY}',
                            MC_STATE='${MC_STATE}'
                          WHERE
                            MC_ID=${MC_ID}`;

      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to update details' });
        if (results.affectedRows === 1) {
          logger.info('Country Details have been updated.');
          this.getAllCountryData().then(countries => {
            resolve(countries);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to update country details' });
        }
      });
    });
  }

  deleteCountryData(MC_ID) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM TIS_MASTER_COUNTRY WHERE MC_ID=${MC_ID}`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to delete country' });
        if (results.affectedRows === 1) {
          logger.info('Country Details have been deleted.');
          this.getAllCountryData().then(countries => {
            resolve(countries);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to delete country' });
        }
      });
    });
  }
}

export default MasterDataDao;
