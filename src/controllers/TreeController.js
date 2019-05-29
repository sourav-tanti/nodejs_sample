import TreeService from '../services/TreeService';
import { logger } from '../config/logger';

class TreeController {

  getAllTreeDetails(req, res, cb) {
      new TreeService().getAllTreeDetails().then(trees => {
        logger.info('Sending success response');
        res.send({
          status: 'success',
          msg: 'tree details fetched',
          trees
        });
        cb();
      }).catch(err => {
        logger.info(`Sending error response due to ${err.msg}`);
        res.send(err);
        cb();
      });
  }

  addNewTree(req, res, cb) {
    new TreeService().addNewTree(req.body).then(result => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'tree added',
        newId: result.insertId,
        trees: result.trees
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  editTree(req, res, cb) {
    new TreeService().editTree(req.body).then(trees => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'tree updated',
        trees
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  deleteTree(req, res, cb) {
    new TreeService().deleteTree(req.body.t_id).then(trees => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'tree deleted',
        trees
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

}

export default TreeController;
