'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id            : util.pk,
    idSeguimiento : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idSeguimiento'),
      field  : 'id_seguimiento'
    },
    descripcion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.descripcion'),
      field  : 'descripcion'
    },
    archivo: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.archivo'),
      field  : 'archivo'
    }
  };

  fields = util.setTimestamps(fields);

  const Archivo = sequelize.define('archivo', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'archivo'
  });

  return Archivo;
};
