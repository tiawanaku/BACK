'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idSeguimiento : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idSeguimiento'),
      field  : 'id_seguimiento'
    },
    idParticipante: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParticipante'),
      field  : 'id_participante'
    }
  };

  fields = util.setTimestamps(fields);

  const SeguimientoParticipante = sequelize.define('seguimiento_participante', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'seguimiento_participante'
  });

  return SeguimientoParticipante;
};
