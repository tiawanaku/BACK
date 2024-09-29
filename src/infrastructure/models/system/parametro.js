'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id      : util.pk,
    idPadre : {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idPadre'),
      field     : 'id_padre'
    },
    grupo: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.grupo')
    },
    codigo: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.codigo')
    },
    otros: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.otros')
    },
    nombre: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.nombre')
    },
    descripcion: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.descripcion')
    },
    orden: {
      type         : DataTypes.INTEGER,
      allowNull    : false,
      defaultValue : 0,
      xlabel       : lang.t('fields.orden')
    },
    idProceso: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idProceso'),
      field     : 'id_proceso'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Parametro = sequelize.define('parametro', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_parametro'
  });

  return Parametro;
};
