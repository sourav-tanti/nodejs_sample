import mysql from 'mysql';
import { logger } from '../config/logger';

const { mysqlUser,
  mysqlPwd,
  mysqlDb,
  mysqlPort,
  mysqlConnLimit,
  mysqlSchema } = require('../config/app_constants');

  const state = {
    pool: null
  };

  class DBInitialize {
    connect(done) {
      if (state.pool) return done();

      const pool = mysql.createPool({
        connectionLimit: mysqlConnLimit,
        host: mysqlDb,
        port: mysqlPort,
        user: mysqlUser,
        password: mysqlPwd,
        database: mysqlSchema
      });
      pool.query('select 1+1 as Sol', (err) => {
        if (err) return done(err);
        state.pool = pool;
        DBInitialize.prototype.pool = pool;
        logger.debug(`Connected to ${mysqlDb} DB`);
        done();
      });
    }

    close(done) {
      state.pool.end((err) => {
        if (err) return done(err);
        state.pool = null;
        done();
      });
    }
  }

  export default DBInitialize;
