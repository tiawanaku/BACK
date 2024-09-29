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
    idParametroTipoVivienda: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroTipoVivienda'),
      field  : 'id_parametro_tipo_vivienda'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaTipoVivienda = sequelize.define('denuncia_tipo_vivienda', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_tipo_vivienda'
  });

  return DenunciaTipoVivienda;
};
