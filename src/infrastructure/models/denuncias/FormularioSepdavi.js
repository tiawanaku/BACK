'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id            : util.pk,
    idRol : {
        type      : DataTypes.UUID,
        allowNull : false,
        xlabel    : lang.t('fields.idRol'),
        field     : 'id_rol'
    },
    idFormulario : {
        type      : DataTypes.UUID,
        allowNull : false,
        xlabel    : lang.t('fields.idFormulario'),
        field     : 'id_formulario'
    },
    tipoFormulario: {
      type         : DataTypes.ENUM,
      values       : ['ABOGADO', 'SOCIAL', 'PSICOLOGIA', 'VENTANILLA'],
      allowNull    : false,
      defaultValue : 'VENTANILLA',
      xlabel       : lang.t('fields.tipoFormulario'),
      field        : 'tipo_formulario'
    }
  };

  fields = util.setTimestamps(fields);

  const FormularioSepdavi = sequelize.define('formulario_sepdavi', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'formulario_sepdavi'
  });

  return FormularioSepdavi;
};
