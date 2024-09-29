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
    idVFisicaParametro: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idVFisicaParametro'),
      field  : 'id_v_fisica_parametro'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaViolenciaFisica = sequelize.define('denuncia_violencia_fisica', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_violencia_fisica'
  });

  return DenunciaViolenciaFisica;
};
