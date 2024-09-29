'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    entidad : {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.entidad'),
      field  : 'entidad'
    },
    gestion: {
      type      : DataTypes.INTEGER,
      allowNull : true,
      xlabel    : lang.t('fields.gestion'),
      field     : 'gestion'
    },
    contador: {
      type      : DataTypes.INTEGER,
      allowNull : true,
      xlabel    : lang.t('fields.contador'),
      field     : 'contador'
    },
    sigla : {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.sigla'),
      field  : 'sigla'
    },
  };

  fields = util.setTimestamps(fields);

  const CorrelativoGamea = sequelize.define('correlativo_gamea', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'correlativo_gamea'
  });

  return CorrelativoGamea;
};
