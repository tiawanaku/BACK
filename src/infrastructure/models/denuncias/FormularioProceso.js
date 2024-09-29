'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    idProceso : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idProceso'),
      field  : 'id_proceso'
    },
    idFormulario: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idFormulario'),
      field  : 'id_formulario'
    }
  };

  fields = util.setTimestamps(fields);

  const FormularioProceso = sequelize.define('formulario_proceso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'formulario_proceso'
  });

  return FormularioProceso;
};
