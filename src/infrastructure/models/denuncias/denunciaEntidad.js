'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idDenuncia : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idDenuncia'),
      field     : 'id_denuncia'
    },
    idEntidad: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idEntidad'),
      field     : 'id_entidad'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const DenunciaEntidad = sequelize.define('denuncia_entidad', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_entidad'
  });

  return DenunciaEntidad;
};
