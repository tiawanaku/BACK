'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idRol : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idRol'),
      field     : 'id_rol'
    },
    idDenuncia : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idDenuncia'),
      field     : 'id_denuncia'
    },
    idUsuarioAsignado : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idUsuarioAsignado'),
      field     : 'id_usuario_asignado'
    },
    nombreRol: {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.nombreRol'),
      field     : 'nombre_rol'
    },
    trabajo: {
      type      : DataTypes.TEXT,
      allowNull : false,
      xlabel    : lang.t('fields.trabajo'),
      field     : 'trabajo'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const DenunciaLlenadoRol = sequelize.define('denuncia_llenado_rol', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_llenado_rol'
  });

  return DenunciaLlenadoRol;
};
