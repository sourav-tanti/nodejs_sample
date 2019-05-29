import UserDao from '../dao/UserDao';
import { logger } from '../config/logger';

class UserService {

  validateUser({ phone, password }) {
    logger.debug('Calling DAO for validating user.');
    logger.info(`Validating user ${phone}`);
    return new Promise((resolve, reject) => {
      new UserDao().validateUser(phone, password)
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

export default UserService;
