'use strict';
const globalConstants = {};

globalConstants.env = process.env.env;
globalConstants.port = process.env.port;
globalConstants.mysqlDb = process.env.mysqlDb;
globalConstants.mysqlPort = process.env.mysqlPort;
globalConstants.mysqlConnLimit = process.env.mysqlConnLimit;
globalConstants.mysqlSchema = process.env.mysqlSchema;
globalConstants.mysqlUser = process.env.mysqlUser;
globalConstants.mysqlPwd = process.env.mysqlPwd;
globalConstants.secretString = 'ImJusFollowingtreNd@18';

module.exports = globalConstants;
