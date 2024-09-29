'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type   : DataTypes.STRING(255),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    configuracion: {
      type   : DataTypes.JSONB,
      xlabel : lang.t('fields.configuracion'),
      field  : 'configuracion'
    }
  };

  fields = util.setTimestamps(fields);

  const Formulario = sequelize.define('formulario', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'formulario'
  });

  return Formulario;
};
