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
    idTipoBien: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idTipoBien'),
      field  : 'id_tipo_bien'
    },
    valorEconomico: {
      type      : DataTypes.STRING(20),
      allowNull : true,
      xlabel    : lang.t('fields.valorEconomico'),
      field     : 'valor_economico'
    },
    descripcion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.descripcion'),
      field  : 'descripcion'
    }
  };

  fields = util.setTimestamps(fields);

  const bienesCautelados = sequelize.define('bienesCautelados', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'bienes_cautelados'
  });

  return bienesCautelados;
};
