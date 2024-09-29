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
    idParametroDefensoria: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroDefensoria'),
      field  : 'id_parametro_defensoria'
    }
  };

  fields = util.setTimestamps(fields);

  const UsuarioDefensoria = sequelize.define('usuario_defensoria', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'usuario_defensoria'
  });

  return UsuarioDefensoria;
};
