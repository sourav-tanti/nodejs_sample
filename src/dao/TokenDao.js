import DBInitialize from '../services/DBInitialize';
import { logger } from '../config/logger';

class TokenDao {

  validateUser(clientId, clientSecret) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM TIS_TOKEN_USER
      WHERE
      TU_USERNAME='${clientId}' AND
      TU_PASSWORD='${clientSecret}'`;
      logger.debug(`Validating User ${clientId}`);
      new DBInitialize().pool.query(queryString, (error, results) => {
        if (error) throw error;
        if (results.length === 1) {
          logger.info(`${clientId} User Found. Proceeding for token generation.`);
          resolve(results);
        } else {
          logger.info(`${clientId} User couldn't validate. Rejecting Promise.`);
          reject({ status: 'failed', msg: 'Incorrect Username/Password.' });
        }
      });
    });
  }
}

export default TokenDao;
