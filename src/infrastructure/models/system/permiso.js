'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.nombre')
    },
    grupo: {
      type      : DataTypes.ENUM,
      values    : ['DENUNCIA', 'SISTEMA'],
      allowNull : false,
      xlabel    : lang.t('fields.grupo')
    },
    descripcion: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.descripcion')
    },
    otros: {
      type      : DataTypes.JSONB,
      allowNull : true,
      xlabel    : lang.t('fields.otros')
    },
    idPadre: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idPadre'),
      field     : 'id_padre'
    },
    idMenu: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idMenu'),
      field     : 'id_menu'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Permiso = sequelize.define('permiso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_permiso'
  });

  return Permiso;
};
