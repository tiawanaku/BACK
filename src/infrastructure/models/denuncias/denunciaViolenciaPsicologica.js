'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idDenuncia : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idDenuncia'),
      field  : 'id_denuncia'
    },
    idVPsicologicaParametro: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idVPsicologicaParametro'),
      field  : 'id_v_psicologica_parametro'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaViolenciaPsicologica = sequelize.define('denuncia_violencia_psicologica', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_violencia_psicologica'
  });

  return DenunciaViolenciaPsicologica;
};
