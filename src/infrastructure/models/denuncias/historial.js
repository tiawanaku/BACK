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
    campo: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.campo'),
      field     : 'campo'
    },
    valor: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.valor'),
      field     : 'valor'
    },
    /* tipo: {
      type         : DataTypes.ENUM,
      values       : ['ABOGADO', 'ORIENTACION', 'SOCIAL', 'PSICOLOGIA'],
      allowNull    : false,
      defaultValue : 'CONTENCION',
      xlabel       : lang.t('fields.tipo'),
      field        : 'tipo'
    } */
  };

  fields = util.setTimestamps(fields);

  const Historial = sequelize.define('historial', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'historial'
  });

  return Historial;
};
