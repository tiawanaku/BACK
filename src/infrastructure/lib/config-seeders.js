'use strict';

const { config } = require('../../common');

const configSeeder = {
  development: {
    username : config.db.username,
    password : config.db.password,
    database : config.db.database,
    host     : config.db.host,
    port     : config.db.port || 5432,
    dialect  : 'postgres',
    pool     : {
      max  : 15,
      min  : 0,
      idle : 10000
    }
  },
  test: {
    username : config.db.username,
    password : config.db.password,
    database : config.db.database,
    host     : config.db.host,
    port     : config.db.port || 5432,
    dialect  : 'postgres',
    pool     : {
      max  : 15,
      min  : 0,
      idle : 10000
    }
  },
  production: {
    username               : config.db.username,
    password               : config.db.password,
    database               : config.db.database,
    host                   : config.db.host,
    port     : config.db.port || 5432,
    seederStorage          : 'sequelize',
    seederStorageTableName : 'sequelize_seeders',
    dialect                : 'postgres',
    pool                   : {
      max  : 15,
      min  : 0,
      idle : 10000
    }
  }
};

module.exports = configSeeder;
