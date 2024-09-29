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
    idParametroCheckPreparatoria: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroCheckPreparatoria'),
      field  : 'id_parametro_check_preparatoria'
    },
    isChecked : {
      type   : DataTypes.BOOLEAN,
      allowNull : false,
      default: false,
      xlabel : lang.t('fields.isChecked'),
      field  : 'is_checked'
    },
  };

  fields = util.setTimestamps(fields);

  const DenunciaCheckPreparatoria = sequelize.define('denuncia_check_preparatoria', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_check_preparatoria'
  });

  return DenunciaCheckPreparatoria;
};
