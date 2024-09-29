'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idDenuncia: {
        type         : DataTypes.UUID,
        allowNull    : true,
        defaultValue : null,
        xlabel       : 'idDenuncia',
        field        : 'id_denuncia'
    },
    nombreCompleto: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : lang.t('fields.nombreCompleto'),
        field        : 'nombre_completo'
    },
    /* idParentesco: {
        type         : DataTypes.UUID,
        allowNull    : true,
        defaultValue : null,
        xlabel       : 'idParentesco',
        field        : 'id_parentesco'
    }, */
    parentesco: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : 'parentesco',
        field        : 'parentesco'
    },
    edad: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : lang.t('fields.edad'),
        field        : 'edad'
    },
    /* idEstadoCivil: {
        type         : DataTypes.UUID,
        allowNull    : true,
        defaultValue : null,
        xlabel       : 'idEstadoCivil',
        field        : 'id_estado_civil'
    }, */
    sexo: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : 'sexo',
        field        : 'sexo'
    },
    gradoInstruccion: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : lang.t('fields.gradoInstruccion'),
        field        : 'grado_instruccion'
    },
    ocupacion: {
        type         : DataTypes.TEXT,
        allowNull    : true,
        defaultValue : null,
        xlabel       : lang.t('fields.ocupacion'),
        field        : 'ocupacion'
    },
  };

  fields = util.setTimestamps(fields);

  const GrupoFamiliar = sequelize.define('grupo_familiar', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'grupo_familiar'
  });

  return GrupoFamiliar;
};
