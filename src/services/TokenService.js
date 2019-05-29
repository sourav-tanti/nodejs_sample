import TokenDao from '../dao/TokenDao';
import { logger } from '../config/logger';

class TokenService {

  authUser({ clientId, clientSecret }) {
    logger.debug('Calling DAO for validating user.');
    logger.info(`Validating user ${clientId}`);
    return new Promise((resolve, reject) => {
      new TokenDao().validateUser(clientId, clientSecret)
      .then(result => {
        logger.debug('Resolving user to controller.');
        resolve(result);
      })
      .catch(err => {
        logger.debug('Rejecting promise to controller.');
        reject(err);
      });
    });
  }
}

export default TokenService;
