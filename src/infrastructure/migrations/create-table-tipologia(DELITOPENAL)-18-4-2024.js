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
      idDPenalParametro: {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idDPenalParametro'),
        field  : 'id_d_penal_parametro'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('denuncia_delito_penal', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'denuncia_delito_penal'
    });
  }
};