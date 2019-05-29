import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

class TreeDao {

  getAllTreeDetails() {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT * FROM TIS_TREE';
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to fetch tree details' });
        if (results.length >= 0) {
          logger.info('Tree Details have been fetched.');
          resolve(results);
        }
      });
    });
  }

  addNewTree(treeParams) {
    return new Promise((resolve, reject) => {
      const {
        t_genus_name,
        t_species_name,
        t_family,
        t_order,
        t_class,
        t_common_name,
        t_growth_form,
        t_percent_leaf_type,
        t_leaf_type,
        t_growth_rate,
        t_longevity,
        t_height_maturity,
        t_native_continent
      } = treeParams;
      const queryString = `INSERT INTO
                            TIS_TREE(
                            	T_GENUS_NAME,
                            	T_SPECIES_NAME,
                            	T_FAMILY,
                            	T_ORDER,
                            	T_CLASS,
                            	T_COMMON_NAME,
                            	T_GROWTH_FORM,
                            	T_PERCENT_LEAF_TYPE,
                            	T_LEAF_TYPE,
                            	T_GROWTH_RATE,
                            	T_LONGEVITY,
                            	T_HEIGHT_MATURITY,
                            	T_NATIVE_CONTINENT
                            ) VALUES (
                            	'${t_genus_name}',
                            	'${t_species_name}',
                            	'${t_family}',
                            	'${t_order}',
                            	'${t_class}',
                            	'${t_common_name}',
                            	'${t_growth_form}',
                            	'${t_percent_leaf_type}',
                            	'${t_leaf_type}',
                            	'${t_growth_rate}',
                            	'${t_longevity}',
                            	${t_height_maturity},
                            	'${t_native_continent}'
                            );`;

      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.insertId) {
          logger.info(`New Tree have been added with ID ${results.insertId}`);
          this.getAllTreeDetails().then(res => {
            resolve({ insertId: results.insertId, trees: res });
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'Unable to insert new tree' });
        }
      });
    });
  }

  editTree(treeParams) {
    return new Promise((resolve, reject) => {
      const {
        t_id,
        t_genus_name,
        t_species_name,
        t_family,
        t_order,
        t_class,
        t_common_name,
        t_growth_form,
        t_percent_leaf_type,
        t_leaf_type,
        t_growth_rate,
        t_longevity,
        t_height_maturity,
        t_native_continent
      } = treeParams;

      const queryString = `UPDATE TIS_TREE
                          SET
                          	T_GENUS_NAME='${t_genus_name}',
                          	T_SPECIES_NAME='${t_species_name}',
                          	T_FAMILY='${t_family}',
                          	T_ORDER='${t_order}',
                          	T_CLASS='${t_class}',
                          	T_COMMON_NAME='${t_common_name}',
                          	T_GROWTH_FORM='${t_growth_form}',
                          	T_PERCENT_LEAF_TYPE='${t_percent_leaf_type}',
                          	T_LEAF_TYPE='${t_leaf_type}',
                          	T_GROWTH_RATE='${t_growth_rate}',
                          	T_LONGEVITY='${t_longevity}',
                          	T_HEIGHT_MATURITY=${t_height_maturity},
                          	T_NATIVE_CONTINENT='${t_native_continent}'
                          WHERE
                          	T_ID=${t_id}`;

      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to update details' });
        if (results.affectedRows === 1) {
          logger.info('Tree Details have been updated.');
          this.getAllTreeDetails().then(trees => {
            resolve(trees);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to update tree details' });
        }
      });
    });
  }

  deleteTree(t_id) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM TIS_TREE WHERE T_ID=${t_id}`;
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) reject({ status: 'failed', msg: 'Unable to delete tree' });
        if (results.affectedRows === 1) {
          logger.info('Tree Details have been deleted.');
          this.getAllTreeDetails().then(trees => {
            resolve(trees);
          }).catch(err => {
            logger.debug(`Error occurred while fetching data: ${err}`);
          });
        } else {
          reject({ status: 'failed', msg: 'unable to delete tree' });
        }
      });
    });
  }
}

export default TreeDao;
