import jsonwebtoken from 'jsonwebtoken';
import TokenService from '../services/TokenService';
import { logger } from '../config/logger';

class TokenController {

  authenticateUser(req, res, cb) {
    logger.info('Validating user for token generation.');
    new TokenService().authUser(req.body)
    .then(user => {
      const expiresIn = 6000; // In Secs
      const token = jsonwebtoken.sign({ admin: user.TU_APIKEY }, req.secretString, {
        expiresIn
      });
      logger.debug('Token generated using HS256 algorithm.');
      logger.info(`User is validated and token generated on ${new Date()}`);
      res.send({
        status: 'success',
        msg: 'token generated',
        token,
        expiresInSecs: expiresIn
      });
      cb();
    })
    .catch(err => {
      logger.info(`Token generation failed due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }
}

export default TokenController;
