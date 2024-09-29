'use strict';

const util = require('../lib/util');
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fields = {

      id : util.pk,
      idUsuario : {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idUsuario'),
        field  : 'id_usuario'
      },
      idParametroDefensoria: {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idParametroDefensoria'),
        field  : 'id_parametro_defensoria'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('usuario_defensoria', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'usuario_defensoria'
    });
  }
};