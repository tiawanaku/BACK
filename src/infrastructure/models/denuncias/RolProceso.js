'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id    : util.pk,
    idRol : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idRol'),
      field  : 'id_rol'
    },
    idProceso: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idProceso'),
      field  : 'id_proceso'
    }
  };

  fields = util.setTimestamps(fields);

  const RolProceso = sequelize.define('rol_proceso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'rol_proceso'
  });

  return RolProceso;
};
