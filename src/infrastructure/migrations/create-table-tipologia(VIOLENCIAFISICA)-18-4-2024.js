'use strict';

const util = require('../lib/util');
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fields = {

      id : util.pk,
      idDenuncia : {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idDenuncia'),
        field  : 'id_denuncia'
      },
      idVFisicaParametro: {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idVFisicaParametro'),
        field  : 'id_v_fisica_parametro'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('denuncia_violencia_fisica', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'denuncia_violencia_fisica'
    });
  }
};