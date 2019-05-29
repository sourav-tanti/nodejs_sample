import TreeDao from '../dao/TreeDao';
import { logger } from '../config/logger';

class TreeService {
  getAllTreeDetails() {
    logger.debug('Calling DAO for fetching all tree details.');
    logger.info('Fetching all Tree Details');
    return new Promise((resolve, reject) => {
      new TreeDao().getAllTreeDetails()
      .then(result => {
        logger.debug('Resolving tree details to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  addNewTree(treeParams) {
    logger.debug('Calling DAO for adding new tree.');
    logger.info(`Adding new tree ${treeParams.t_common_name}`);
    return new Promise((resolve, reject) => {
      new TreeDao().addNewTree(treeParams)
      .then(result => {
        logger.debug('Resolving tree add response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  editTree(treeParams) {
    logger.debug('Calling DAO for updating tree.');
    logger.info(`Updating tree ${treeParams.t_id}`);
    return new Promise((resolve, reject) => {
      new TreeDao().editTree(treeParams)
      .then(result => {
        logger.debug('Resolving tree update response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }

  deleteTree(t_id) {
    logger.debug('Calling DAO for deleting tree.');
    logger.info(`Deleting tree ${t_id}`);
    return new Promise((resolve, reject) => {
      new TreeDao().deleteTree(t_id)
      .then(result => {
        logger.debug('Resolving tree delete response to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }
}

export default TreeService;
