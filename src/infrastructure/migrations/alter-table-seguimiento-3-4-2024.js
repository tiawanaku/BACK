'use strict';

const tableName = 'seguimiento';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

          if (!tableDefinition.id_etapa_procesal) {
            await queryInterface.addColumn(tableName, 'id_etapa_procesal', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idEtapaProcesal'),
              field        : 'id_etapa_procesal'
            });
          }

          if (!tableDefinition.fecha_preliminar) {
            await queryInterface.addColumn(tableName, 'fecha_preliminar', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaPreliminar'),
              field        : 'fecha_preliminar'
            });
          }
          if (!tableDefinition.fecha_rechazo_con) {
            await queryInterface.addColumn(tableName, 'fecha_rechazo_con', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaRechazoCon'),
              field        : 'fecha_rechazo_con'
            });
          }
          if (!tableDefinition.numero_resolucion) {
            await queryInterface.addColumn(tableName, 'numero_resolucion', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.numeroResolucion'),
              field        : 'numero_resolucion'
            });
          }
          if (!tableDefinition.fecha_rechazo_sin) {
            await queryInterface.addColumn(tableName, 'fecha_rechazo_sin', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaRechazoSin'),
              field        : 'fecha_rechazo_sin'
            });
          }
          if (!tableDefinition.id_delito_imputacion) {
            await queryInterface.addColumn(tableName, 'id_delito_imputacion', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoImputacion'),
              field        : 'id_delito_imputacion'
            });
          }
          if (!tableDefinition.fecha_imputacion) {
            await queryInterface.addColumn(tableName, 'fecha_imputacion', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaImputacion'),
              field        : 'fecha_imputacion'
            });
          }
          if (!tableDefinition.fecha_medida_cautelar) {
            await queryInterface.addColumn(tableName, 'fecha_medida_cautelar', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaMedidaCautelar'),
              field        : 'fecha_medida_cautelar'
            });
          }
          if (!tableDefinition.fecha_audiencia) {
            await queryInterface.addColumn(tableName, 'fecha_audiencia', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaAudiencia'),
              field        : 'fecha_audiencia'
            });
          }
          if (!tableDefinition.id_medida_cautelar) {
            await queryInterface.addColumn(tableName, 'id_medida_cautelar', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idMedidaCautelar'),
              field        : 'id_medida_cautelar'
            });
          }
          if (!tableDefinition.meses_detencion) {
            await queryInterface.addColumn(tableName, 'meses_detencion', {
              type         : Sequelize.INTEGER,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.mesesDetencion'),
              field        : 'meses_detencion'
            });
          }
          if (!tableDefinition.meses_ampliacion) {
            await queryInterface.addColumn(tableName, 'meses_ampliacion', {
              type         : Sequelize.INTEGER,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.mesesAmpliacion'),
              field        : 'meses_ampliacion'
            });
          }
          if (!tableDefinition.id_delito_con_impugnacion) {
            await queryInterface.addColumn(tableName, 'id_delito_con_impugnacion', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoConImpugnacion'),
              field        : 'id_delito_con_impugnacion'
            });
          }
          if (!tableDefinition.fecha_con_impugnacion) {
            await queryInterface.addColumn(tableName, 'fecha_con_impugnacion', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaConImpugnacion'),
              field        : 'fecha_con_impugnacion'
            });
          }
          if (!tableDefinition.numero_resolucion_con_impugnacion) {
            await queryInterface.addColumn(tableName, 'numero_resolucion_con_impugnacion', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.numeroResolucionConImpugnacion'),
              field        : 'numero_resolucion_con_impugnacion'
            });
          }
          if (!tableDefinition.id_delito_sin_impugnacion) {
            await queryInterface.addColumn(tableName, 'id_delito_sin_impugnacion', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoSinImpugnacion'),
              field        : 'id_delito_sin_impugnacion'
            });
          }
          if (!tableDefinition.fecha_sin_impugnacion) {
            await queryInterface.addColumn(tableName, 'fecha_sin_impugnacion', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaSinImpugnacion'),
              field        : 'fecha_sin_impugnacion'
            });
          }
          if (!tableDefinition.numero_resolucion_sin_impugnacion) {
            await queryInterface.addColumn(tableName, 'numero_resolucion_sin_impugnacion', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.numeroResolucionSinImpugnacion'),
              field        : 'numero_resolucion_sin_impugnacion'
            });
          }
          if (!tableDefinition.fecha_acusacion_fiscal) {
            await queryInterface.addColumn(tableName, 'fecha_acusacion_fiscal', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaAcusacionFiscal'),
              field        : 'fecha_acusacion_fiscal'
            });
          }
          if (!tableDefinition.fecha_acusacion_particular) {
            await queryInterface.addColumn(tableName, 'fecha_acusacion_particular', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaAcusacionParticular'),
              field        : 'fecha_acusacion_particular'
            });
          }
          if (!tableDefinition.fecha_acusacion_defensorias) {
            await queryInterface.addColumn(tableName, 'fecha_acusacion_defensorias', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaAcusacionDefensorias'),
              field        : 'fecha_acusacion_defensorias'
            });
          }
          if (!tableDefinition.fecha_juicio_oral) {
            await queryInterface.addColumn(tableName, 'fecha_juicio_oral', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaJuicioOral'),
              field        : 'fecha_juicio_oral'
            });
          }
          if (!tableDefinition.id_delito_sentencia_absolutoria) {
            await queryInterface.addColumn(tableName, 'id_delito_sentencia_absolutoria', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoSentenciaAbsolutoria'),
              field        : 'id_delito_sentencia_absolutoria'
            });
          }
          if (!tableDefinition.fecha_sent_absolutoria) {
            await queryInterface.addColumn(tableName, 'fecha_sent_absolutoria', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaSentAbsolutoria'),
              field        : 'fecha_sent_absolutoria'
            });
          }
          if (!tableDefinition.numero_sentencia) {
            await queryInterface.addColumn(tableName, 'numero_sentencia', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.numeroSentencia'),
              field        : 'numero_sentencia'
            });
          }
          if (!tableDefinition.id_presento_sent_absolutoria) {
            await queryInterface.addColumn(tableName, 'id_presento_sent_absolutoria', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idPresentoSentAbsolutoria'),
              field        : 'id_presento_sent_absolutoria'
            });
          }
          if (!tableDefinition.recurso_sent_absolutoria) {
            await queryInterface.addColumn(tableName, 'recurso_sent_absolutoria', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.recursoSentAbsolutoria'),
              field        : 'recurso_sent_absolutoria'
            });
          }
          if (!tableDefinition.id_delito_sentencia_condenatoria) {
            await queryInterface.addColumn(tableName, 'id_delito_sentencia_condenatoria', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoSentenciaCondenatoria'),
              field        : 'id_delito_sentencia_condenatoria'
            });
          }
          if (!tableDefinition.fecha_sentencia) {
            await queryInterface.addColumn(tableName, 'fecha_sentencia', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaSentencia'),
              field        : 'fecha_sentencia'
            });
          }
          if (!tableDefinition.anios_sentencia) {
            await queryInterface.addColumn(tableName, 'anios_sentencia', {
              type         : Sequelize.INTEGER,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.aniosSentencia'),
              field        : 'anios_sentencia'
            });
          }
          if (!tableDefinition.meses_sentencia) {
            await queryInterface.addColumn(tableName, 'meses_sentencia', {
              type         : Sequelize.INTEGER,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.mesesSentencia'),
              field        : 'meses_sentencia'
            });
          }
          if (!tableDefinition.dias_multa) {
            await queryInterface.addColumn(tableName, 'dias_multa', {
              type         : Sequelize.INTEGER,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.diasMulta'),
              field        : 'dias_multa'
            });
          }
          if (!tableDefinition.id_penal) {
            await queryInterface.addColumn(tableName, 'id_penal', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idPenal'),
              field        : 'id_penal'
            });
          }
          if (!tableDefinition.id_delito_sentencia_condenatoria_mixta) {
            await queryInterface.addColumn(tableName, 'id_delito_sentencia_condenatoria_mixta', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoSentenciaCondenatoriaMixta'),
              field        : 'id_delito_sentencia_condenatoria_mixta'
            });
          }
          if (!tableDefinition.id_delito_sentencia_absolutoria_mixta) {
            await queryInterface.addColumn(tableName, 'id_delito_sentencia_absolutoria_mixta', {
              type         : Sequelize.UUID,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.idDelitoSentenciaAbsolutoriaMixta'),
              field        : 'id_delito_sentencia_absolutoria_mixta'
            });
          }
          if (!tableDefinition.fecha_sent_mixta) {
            await queryInterface.addColumn(tableName, 'fecha_sent_mixta', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaSentMixta'),
              field        : 'fecha_sent_mixta'
            });
          }
          if (!tableDefinition.fecha_planteamiento) {
            await queryInterface.addColumn(tableName, 'fecha_planteamiento', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaPlanteamiento'),
              field        : 'fecha_planteamiento'
            });
          }
          if (!tableDefinition.fecha_notificacion) {
            await queryInterface.addColumn(tableName, 'fecha_notificacion', {
              type         : Sequelize.DATEONLY,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.fechaNotificacion'),
              field        : 'fecha_notificacion'
            });
          }
          if (!tableDefinition.auto_interlocutorio) {
            await queryInterface.addColumn(tableName, 'auto_interlocutorio', {
              type         : Sequelize.TEXT,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.autoInterlocutorio'),
              field        : 'auto_interlocutorio'
            });
          }
          if (!tableDefinition.se_atendio) {
            await queryInterface.addColumn(tableName, 'se_atendio', {
              type         : Sequelize.BOOLEAN,
              allowNull    : true,
              defaultValue : null,
              xlabel       : lang.t('fields.seAtendio'),
              field        : 'se_atendio'
            });
          }

        return Promise.resolve();
      });
  }
};
