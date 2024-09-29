'use strict';

const tableName = 'denuncia';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

          if (!tableDefinition.id_forma_ingreso_slim) {
            await queryInterface.addColumn(tableName, 'id_forma_ingreso_slim', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : lang.t('fields.idFormaIngresoSlim'),
                field        : 'id_forma_ingreso_slim'
            });
          }

          if (!tableDefinition.id_lugar_agresion) {
            await queryInterface.addColumn(tableName, 'id_lugar_agresion', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : lang.t('fields.idLugarAgresion'),
                field        : 'id_lugar_agresion'
            });
          }

        return Promise.resolve();
      });
  }
};