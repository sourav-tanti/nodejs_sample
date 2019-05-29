import MasterDataService from '../services/MasterDataService';
import { logger } from '../config/logger';

class MasterDataController {

  // Genus
  getAllGenusData(req, res, cb) {
    new MasterDataService().getAllGenusData().then(genuses => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'genus details fetched',
        genuses
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  addNewGenusData(req, res, cb) {
    new MasterDataService().addNewGenusData(req.body).then(result => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'genus added',
        newId: result.insertId,
        genuses: result.genuses
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  editGenusData(req, res, cb) {
    new MasterDataService().editGenusData(req.body).then(genuses => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'genus updated',
        genuses
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  deleteGenusData(req, res, cb) {
    new MasterDataService().deleteGenusData(req.body.MG_ID).then(genuses => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'genus deleted',
        genuses
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  // Country
  getAllCountryData(req, res, cb) {
    new MasterDataService().getAllCountryData().then(countries => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'country details fetched',
        countries
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  addNewCountryData(req, res, cb) {
    new MasterDataService().addNewCountryData(req.body).then(result => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'country added',
        newId: result.insertId,
        countries: result.countries
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  editCountryData(req, res, cb) {
    new MasterDataService().editCountryData(req.body).then(countries => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'country updated',
        countries
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }

  deleteCountryData(req, res, cb) {
    new MasterDataService().deleteCountryData(req.body.MC_ID).then(countries => {
      logger.info('Sending success response');
      res.send({
        status: 'success',
        msg: 'country deleted',
        countries
      });
      cb();
    }).catch(err => {
      logger.info(`Sending error response due to ${err.msg}`);
      res.send(err);
      cb();
    });
  }
}

export default MasterDataController;
