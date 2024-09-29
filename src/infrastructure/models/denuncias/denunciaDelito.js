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
    idParametroDelito: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroDelito'),
      field  : 'id_parametro_delito'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaDelito = sequelize.define('denuncia_delito', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_delito'
  });

  return DenunciaDelito;
};
