'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id      : util.pk,
    idPadre : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idPadre'),
      field  : 'id_padre'
    },
    codigoIne: {
      type   : DataTypes.STRING(255),
      xlabel : lang.t('fields.codigoIne'),
      field  : 'codigo_ine'
    },
    nivel: {
      type   : DataTypes.INTEGER,
      xlabel : lang.t('fields.nivel'),
      field  : 'nivel'
    },
    nombre: {
      type   : DataTypes.STRING(255),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    latitud: {
      type   : DataTypes.FLOAT(8),
      xlabel : lang.t('fields.latitud'),
      field  : 'latitud'
    },
    longitud: {
      type   : DataTypes.FLOAT(8),
      xlabel : lang.t('fields.longitud'),
      field  : 'longitud'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Dpa = sequelize.define('dpa', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_dpa'
  });

  return Dpa;
};
