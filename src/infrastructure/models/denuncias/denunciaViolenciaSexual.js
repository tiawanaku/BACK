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
    idVSexualParametro: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idVSexualParametro'),
      field  : 'id_v_sexual_parametro'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaViolenciaSexual = sequelize.define('denuncia_violencia_sexual', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_violencia_sexual'
  });

  return DenunciaViolenciaSexual;
};
