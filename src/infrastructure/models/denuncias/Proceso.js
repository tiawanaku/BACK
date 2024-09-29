'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    secuenciaAnual: {
      type         : DataTypes.BOOLEAN,
      defaultValue : false,
      allowNull    : false,
      xlabel       : lang.t('fields.secuenciaAnual'),
      field        : 'secuencia_anual'
    },
    anio: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      allowNull    : false,
      xlabel       : lang.t('fields.anio'),
      field        : 'anio'
    },
    secuencia: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.secuencia'),
      field        : 'secuencia'
    },
    configuracion: {
      type         : DataTypes.JSONB,
      defaultValue : '[]',
      xlabel       : lang.t('fields.configuracion'),
      field        : 'configuracion'
    },
    sigla: {
      type   : DataTypes.STRING(10),
      xlabel : lang.t('fields.sigla'),
      field  : 'sigla'
    },
    entidades: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.entidades'),
      field  : 'entidades'
    },
    descripcion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.descripcion'),
      field  : 'descripcion'
    }
  };

  fields = util.setTimestamps(fields);

  const Proceso = sequelize.define('proceso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'proceso'
  });

  return Proceso;
};
