import UserService from '../services/UserService';
import { logger } from '../config/logger';

class UserController {

  validateUser(req, res, cb) {
    new UserService().validateUser(req.body).then(user => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'user validated',
        user
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }
}

export default UserController;
