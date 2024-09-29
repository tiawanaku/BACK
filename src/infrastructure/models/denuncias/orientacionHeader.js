'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id    : util.pk,
    celdaCodigo : {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.celdaCodigo'),
      field     : 'celda_codigo'
    },
    celdaFecha : {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.celdaFecha'),
      field     : 'celda_fecha'
    },
    celdaVersion : {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.celdaVersion'),
      field     : 'celda_version'
    },
    celdaDescripcion : {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.celdaDescripcion'),
      field     : 'celda_descripcion'
    },
    titulo : {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.titulo'),
      field     : 'titulo'
    },
    tipo: {
      type         : DataTypes.ENUM,
      values       : ['FORMULARIO'],
      allowNull    : false,
      defaultValue : 'FORMULARIO',
      xlabel       : lang.t('fields.tipo'),
      field        : 'tipo'
    }
  };

  fields = util.setTimestamps(fields);

  const PsicologiaHeader = sequelize.define('orientacion_header', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'orientacion_header'
  });

  return PsicologiaHeader;
};
