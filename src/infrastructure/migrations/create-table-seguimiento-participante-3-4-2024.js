'use strict';

const util = require('../lib/util');
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fields = {

      id : util.pk,
      idSeguimiento : {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idSeguimiento'),
        field  : 'id_seguimiento'
      },
      idParticipante: {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idParticipante'),
        field  : 'id_participante'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('seguimiento_participante', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'seguimiento_participante'
    });
  }
};