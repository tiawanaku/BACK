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
    idParametroCheckPreliminar: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idParametroCheckPreliminar'),
      field  : 'id_parametro_check_preliminar'
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

  const DenunciaCheckPreliminar = sequelize.define('denuncia_check_preliminar', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia_check_preliminar'
  });

  return DenunciaCheckPreliminar;
};
