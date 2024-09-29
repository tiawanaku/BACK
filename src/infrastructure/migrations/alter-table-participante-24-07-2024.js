'use strict';

const tableName = 'participante';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

        if (!tableDefinition.edad_meses) {
          await queryInterface.addColumn(tableName, 'edad_meses', {
            type         : Sequelize.TEXT,
            allowNull    : true,
            defaultValue : null,
            xlabel       : 'edadMeses',
            field        : 'edad_meses'
          });
        }

        return Promise.resolve();
    });
  }
};