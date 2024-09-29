'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idUsuario : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idUsuario'),
      field  : 'id_usuario'
    },
    idParametroSlim: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroSlim'),
      field  : 'id_parametro_slim'
    }
  };

  fields = util.setTimestamps(fields);

  const UsuarioSlim = sequelize.define('usuario_slim', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'usuario_slim'
  });

  return UsuarioSlim;
};
