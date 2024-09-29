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
      idParametroCheckPreliminar: {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idParametroCheckPreliminar'),
        field  : 'id_parametro_check_preliminar'
      },
      isChecked: {
        type   : Sequelize.DataTypes.BOOLEAN,
        xlabel : lang.t('fields.isChecked'),
        field  : 'is_checked'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('denuncia_check_preliminar', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'denuncia_check_preliminar'
    });
  }
};