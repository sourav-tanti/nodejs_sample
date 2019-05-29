import _ from 'lodash';
import fs from 'fs';
import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

class LocationDao {

  getAllLocationDetails() {
    return new Promise((resolve, reject) => {
      let queryString = 'SELECT * FROM TIS_LOCATION';
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to fetch location details' });
        if (results.length >= 0) {
          logger.info('Location Details have been fetched.');
          queryString = `SELECT * FROM TIS_PHOTOS WHERE PH_TYPE='location'`;
          new DBInitialize().pool.query(queryString, (err, photos) => {
            const finalResult = _.map(results, result => {
              const filteredPhotos = _.filter(photos, photo => photo.PH_TYPE_ID === result.LOC_ID);
              return Object.assign(result, {
                images: filteredPhotos
               });
            });
            resolve(finalResult);
          });
        }
      });
    });
  }

  addNewLocation({
    LOC_ADDRESS,
    LOC_STREET,
    LOC_LOCALITY,
    LOC_PO_NAME,
    LOC_PS_NAME,
    LOC_POSTAL_CODE,
    LOC_DISTIRCT,
    LOC_WARD,
    LOC_CITY,
    LOC_STATE,
    LOC_COUNTRY,
    LOC_WARM_TEMP,
    LOC_ABUNDANT_RAIN,
    LOC_ABUNDANT_VEG,
    LOC_SNOW,
    LOC_SIDE,
    LOC_GROWTH_SPACE,
    LOC_SIDE_STRT_NAME,
    LOC_NEAR_BUILDING_WHEN,
    LOC_NEAR_BUILDING_FAR,
    LOC_NEAR_BUILDING_COMPAS_DIR,
    LOC_OBSTACLE_DETAILS,
    LOC_NOTE,
    LOC_REMARKS
  }, files) {

    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO
                            TIS_LOCATION(
                              LOC_INSPECTION_DATE,
                              LOC_ADDRESS,
                              LOC_STREET,
                              LOC_LOCALITY,
                              LOC_PO_NAME,
                              LOC_PS_NAME,
                              LOC_POSTAL_CODE,
                              LOC_DISTIRCT,
                              LOC_WARD,
                              LOC_CITY,
                              LOC_STATE,
                              LOC_COUNTRY,
                              LOC_WARM_TEMP,
                              LOC_ABUNDANT_RAIN,
                              LOC_ABUNDANT_VEG,
                              LOC_SNOW,
                              LOC_SIDE,
                              LOC_GROWTH_SPACE,
                              LOC_SIDE_STRT_NAME,
                              LOC_NEAR_BUILDING_WHEN,
                              LOC_NEAR_BUILDING_FAR,
                              LOC_NEAR_BUILDING_COMPAS_DIR,
                              LOC_OBSTACLE_DETAILS,
                              LOC_NOTE,
                              LOC_REMARKS
                            ) VALUES (
                              convert_tz(UTC_TIMESTAMP(), '+00:00','+05:30'),
                              '${LOC_ADDRESS}',
                              '${LOC_STREET}',
                              '${LOC_LOCALITY}',
                              '${LOC_PO_NAME}',
                              '${LOC_PS_NAME}',
                              '${LOC_POSTAL_CODE}',
                              '${LOC_DISTIRCT}',
                              '${LOC_WARD}',
                              '${LOC_CITY}',
                              '${LOC_STATE}',
                              '${LOC_COUNTRY}',
                              '${LOC_WARM_TEMP}',
                              '${LOC_ABUNDANT_RAIN}',
                              '${LOC_ABUNDANT_VEG}',
                              '${LOC_SNOW}',
                              '${LOC_SIDE}',
                              '${LOC_GROWTH_SPACE}',
                              '${LOC_SIDE_STRT_NAME}',
                              '${LOC_NEAR_BUILDING_WHEN}',
                              '${LOC_NEAR_BUILDING_FAR}',
                              '${LOC_NEAR_BUILDING_COMPAS_DIR}',
                              '${LOC_OBSTACLE_DETAILS}',
                              '${LOC_NOTE}',
                              '${LOC_REMARKS}'
                            )`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.insertId) {
          logger.info(`New Location details have been added with ID ${results.insertId}`);
          logger.debug('Inserting Location photos');
          files.forEach(file => {
            const photoInsertQuery = `INSERT INTO TIS_PHOTOS(PH_TYPE, PH_TYPE_ID, PH_DESC, PH_URL)
                                      VALUES(
                                        'location',
                                        ${results.insertId},
                                        'unknown',
                                        '${file.filename}'
                                      )`;
            new DBInitialize().pool.query(photoInsertQuery, (e, r) => {
              logger.debug(`${file.filename} has been inserted for location ${results.insertId}`);
            });
          });

          this.getAllLocationDetails().then(res => {
            resolve({ insertId: results.insertId, locations: res });
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'Unable to insert new location' });
        }
      });
    });
  }

  editLocation({
    LOC_ID,
    LOC_ADDRESS,
    LOC_STREET,
    LOC_LOCALITY,
    LOC_PO_NAME,
    LOC_PS_NAME,
    LOC_POSTAL_CODE,
    LOC_DISTIRCT,
    LOC_WARD,
    LOC_CITY,
    LOC_STATE,
    LOC_COUNTRY,
    LOC_WARM_TEMP,
    LOC_ABUNDANT_RAIN,
    LOC_ABUNDANT_VEG,
    LOC_SNOW,
    LOC_SIDE,
    LOC_GROWTH_SPACE,
    LOC_SIDE_STRT_NAME,
    LOC_NEAR_BUILDING_WHEN,
    LOC_NEAR_BUILDING_FAR,
    LOC_NEAR_BUILDING_COMPAS_DIR,
    LOC_OBSTACLE_DETAILS,
    LOC_NOTE,
    LOC_REMARKS
  }) {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE TIS_LOCATION
                          SET
                          LOC_ADDRESS='${LOC_ADDRESS}',
                          LOC_STREET='${LOC_STREET}',
                          LOC_LOCALITY='${LOC_LOCALITY}',
                          LOC_PO_NAME='${LOC_PO_NAME}',
                          LOC_PS_NAME='${LOC_PS_NAME}',
                          LOC_POSTAL_CODE=${LOC_POSTAL_CODE},
                          LOC_DISTIRCT='${LOC_DISTIRCT}',
                          LOC_WARD='${LOC_WARD}',
                          LOC_CITY='${LOC_CITY}',
                          LOC_STATE='${LOC_STATE}',
                          LOC_COUNTRY='${LOC_COUNTRY}',
                          LOC_WARM_TEMP='${LOC_WARM_TEMP}',
                          LOC_ABUNDANT_RAIN='${LOC_ABUNDANT_RAIN}',
                          LOC_ABUNDANT_VEG='${LOC_ABUNDANT_VEG}',
                          LOC_SNOW='${LOC_SNOW}',
                          LOC_SIDE='${LOC_SIDE}',
                          LOC_GROWTH_SPACE='${LOC_GROWTH_SPACE}',
                          LOC_SIDE_STRT_NAME='${LOC_SIDE_STRT_NAME}',
                          LOC_NEAR_BUILDING_WHEN='${LOC_NEAR_BUILDING_WHEN}',
                          LOC_NEAR_BUILDING_FAR='${LOC_NEAR_BUILDING_FAR}',
                          LOC_NEAR_BUILDING_COMPAS_DIR='${LOC_NEAR_BUILDING_COMPAS_DIR}',
                          LOC_OBSTACLE_DETAILS='${LOC_OBSTACLE_DETAILS}',
                          LOC_NOTE='${LOC_NOTE}',
                          LOC_REMARKS='${LOC_REMARKS}'
                          WHERE
                            LOC_ID=${LOC_ID}`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to update details' });
        if (results.affectedRows === 1) {
          logger.info('Location Details have been updated.');
          this.getAllLocationDetails().then(locations => {
            resolve(locations);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to update location details' });
        }
      });
    });
  }

  deletePhotos(LOC_ID) {
    logger.info('Deleting image files from file system.');
    const selectQueryString = `SELECT PH_URL FROM TIS_PHOTOS
                               WHERE PH_TYPE='location' AND
                               PH_TYPE_ID=${LOC_ID}`;
    new DBInitialize().pool.query(selectQueryString, (error, results) => {
      results.forEach(photo => {
        fs.unlink(`${process.env.imagepath}/${photo.PH_URL}`, err => {
          if (!err) logger.info(`${photo.PH_URL} is deleted.`);
        });
      });

      const deleteQueryString = `DELETE FROM TIS_PHOTOS WHERE PH_TYPE_ID=${LOC_ID}`;
      new DBInitialize().pool.query(deleteQueryString, (e, r) => {
        if (!e) logger.info('Photos have been deleted from DB.');
      });
    });
  }

  deleteLocation(LOC_ID) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM TIS_LOCATION WHERE LOC_ID=${LOC_ID}`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to delete location' });
        if (results.affectedRows === 1) {
          logger.info('Location Details have been deleted.');
          this.deletePhotos(LOC_ID);
          this.getAllLocationDetails().then(locations => {
            resolve(locations);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to delete location' });
        }
      });
    });
  }
}

export default LocationDao;
