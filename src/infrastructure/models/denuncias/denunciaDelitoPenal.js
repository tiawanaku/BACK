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
    idDPenalParametro: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroDelito'),
      field  : 'id_d_penal_parametro'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaDelitoPenal = sequelize.define('denuncia_delito_penal', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_delito_penal'
  });

  return DenunciaDelitoPenal;
};
