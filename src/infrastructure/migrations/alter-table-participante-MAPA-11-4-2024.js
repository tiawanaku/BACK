'use strict';

const tableName = 'participante';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

          if (!tableDefinition.latitud) {
            await queryInterface.addColumn(tableName, 'latitud', {
                type         : Sequelize.DOUBLE,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'latitud',
                field        : 'latitud'
            });
          }

          if (!tableDefinition.longitud) {
            await queryInterface.addColumn(tableName, 'longitud', {
                type         : Sequelize.DOUBLE,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'longitud',
                field        : 'longitud'
            });
          }

        return Promise.resolve();
      });
  }
};