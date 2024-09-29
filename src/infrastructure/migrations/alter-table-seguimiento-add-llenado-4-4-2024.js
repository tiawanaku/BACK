'use strict';

const tableName = 'seguimiento';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

          if (!tableDefinition.nombre_etapa_rol) {
            await queryInterface.addColumn(tableName, 'nombre_etapa_rol', {
              type         : Sequelize.ENUM,
              values       : ['ORIENTACION', 'PSICOLOGIA', 'SOCIAL', 'PATROCINIO'],
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.nombreEtapaRol'),
              field        : 'nombre_etapa_rol'
            });
          }

        return Promise.resolve();
      });
  }
};
