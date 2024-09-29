'use strict';

const util = require('../lib/util');
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fields = {
      id         : util.pk,
      idDenuncia : {
        type   : Sequelize.DataTypes.UUID,
        xlabel : lang.t('fields.idDenuncia'),
        field  : 'id_denuncia'
      },
      idUsuarioAsignado: {
        type      : Sequelize.DataTypes.UUID,
        xlabel    : lang.t('fields.idUsuarioAsignado'),
        allowNull : true,
        field     : 'id_usuario_asignado'
      },
      tipoSeguimiento: {
        type         : Sequelize.DataTypes.ENUM,
        values       : ['SISTEMA', 'USUARIO'],
        defaultValue : 'SISTEMA',
        allowNull    : false,
        xlabel       : lang.t('fields.tipoSeguimiento'),
        field        : 'tipo_seguimiento'
      },
      fechaActuacion: {
        type   : Sequelize.DataTypes.DATEONLY,
        xlabel : lang.t('fields.fechaActuacion'),
        field  : 'fecha_actuacion'
      },
      actuacion: {
        type   : Sequelize.DataTypes.TEXT,
        xlabel : lang.t('fields.actuacion'),
        field  : 'actuacion'
      },
      estadoDenuncia: {
        type      : Sequelize.DataTypes.STRING(150),
        allowNull : false,
        xlabel    : lang.t('fields.estadoDenuncia'),
        field     : 'estado_denuncia'
      },
      etapaDenuncia: {
        type      : Sequelize.DataTypes.TEXT,
        allowNull : true,
        xlabel    : lang.t('fields.etapaDenuncia'),
        field     : 'etapa_denuncia'
      },
      idEtapa: {
        type      : Sequelize.DataTypes.UUID,
        allowNull : true,
        xlabel    : lang.t('fields.idEtapa'),
        field     : 'id_etapa'
      }
    };

    // Agregando campos para el log
    fields = util.setTimestamps(fields);

    return queryInterface.createTable('seguimiento', fields, {
      paranoid   : true,
      timestamps : true,
      tableName  : 'seguimiento'
    });
  }
};