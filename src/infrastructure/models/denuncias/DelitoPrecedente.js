'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idDenuncia : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idDenuncia'),
      field     : 'id_denuncia'
    },
    idCategoriaDelito: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idCategoriaDelito'),
      field     : 'id_categoria_delito'
    },
    idDelitoPrecedente: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idDelitoPrecedente'),
      field     : 'id_delito_precedente'
    },
    observacion: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.observacion'),
      field     : 'observacion'
    }
  };

  fields = util.setTimestamps(fields);

  const DelitoPrecedente = sequelize.define('delito_precedente', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'delito_precedente'
  });

  return DelitoPrecedente;
};
