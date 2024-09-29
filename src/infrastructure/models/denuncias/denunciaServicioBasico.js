'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id         : util.pk,
    idDenuncia : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idDenuncia'),
      field  : 'id_denuncia'
    },
    idParametroServicioBasico: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroServicioBasico'),
      field  : 'id_arametro_servicio_basico'
    }
  };

  fields = util.setTimestamps(fields);

  const DenunciaServicioBasico = sequelize.define('denuncia_servicio_basico', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_servicio_basico'
  });

  return DenunciaServicioBasico;
};
