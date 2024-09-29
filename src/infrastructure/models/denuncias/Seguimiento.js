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
    idUsuarioAsignado: {
      type      : DataTypes.UUID,
      xlabel    : lang.t('fields.idUsuarioAsignado'),
      allowNull : true,
      field     : 'id_usuario_asignado'
    },
    tipoSeguimiento: {
      type         : DataTypes.ENUM,
      values       : ['SISTEMA', 'USUARIO'],
      defaultValue : 'SISTEMA',
      allowNull    : false,
      xlabel       : lang.t('fields.tipoSeguimiento'),
      field        : 'tipo_seguimiento'
    },
    fechaActuacion: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaActuacion'),
      field  : 'fecha_actuacion'
    },
    actuacion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.actuacion'),
      field  : 'actuacion'
    },
    estadoDenuncia: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.estadoDenuncia'),
      field     : 'estado_denuncia'
    },
    etapaDenuncia: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.etapaDenuncia'),
      field     : 'etapa_denuncia'
    },
    idEtapa: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idEtapa'),
      field     : 'id_etapa'
    },
    // desde aqui se agrega datos
     // patrocinio data
    idEtapaProcesal: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEtapaProcesal',
      field        : 'id_etapa_procesal'
    },
    // preliminar
    fechaPreliminar: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaPreliminar',
      field        : 'fecha_preliminar'
    },
    // con objecion
    fechaRechazoCon: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaRechazoCon',
      field        : 'fecha_rechazo_con'
    },
    numeroResolucion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucion',
      field        : 'numero_resolucion'
    },
    // sin objecion
    fechaRechazoSin: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaRechazoSin',
      field        : 'fecha_rechazo_sin'
    },
    // imputacion
    idDelitoImputacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoImputacion',
      field        : 'id_delito_imputacion'
    },
    fechaImputacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaImputacion',
      field        : 'fecha_imputacion'
    },
    fechaMedidaCautelar: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaMedidaCautelar',
      field        : 'fecha_medida_cautelar'
    },
    fechaAudiencia: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAudiencia',
      field        : 'fecha_audiencia'
    },
    idMedidaCautelar: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idMedidaCautelar'),
      field        : 'id_medida_cautelar'
    },
    mesesDetencion: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'mesesDetencion',
      field        : 'meses_detencion'
    },
    mesesAmpliacion: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'mesesAmpliacion',
      field        : 'meses_ampliacion'
    },
    // sobreseimiento impugnacion
    idDelitoConImpugnacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoConImpugnacion',
      field        : 'id_delito_con_impugnacion'
    },
    fechaConImpugnacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaConImpugnacion',
      field        : 'fecha_con_impugnacion'
    },
    numeroResolucionConImpugnacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucionConImpugnacion',
      field        : 'numero_resolucion_con_impugnacion'
    },
    // sobreseimiento sin impugnacion
    idDelitoSinImpugnacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSinImpugnacion',
      field        : 'id_delito_sin_impugnacion'
    },
    fechaSinImpugnacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSinImpugnacion',
      field        : 'fecha_sin_impugnacion'
    },
    numeroResolucionSinImpugnacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucionSinImpugnacion',
      field        : 'numero_resolucion_sin_impugnacion'
    },
    // acusacion
    fechaAcusacionFiscal: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAcusacionFiscal',
      field        : 'fecha_acusacion_fiscal'
    },
    fechaAcusacionParticular: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAcusacionParticular',
      field        : 'fecha_acusacion_particular'
    },
    fechaAcusacionDefensorias: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAcusacionDefensorias',
      field        : 'fecha_acusacion_defensorias'
    },
    // juicio oral
    fechaJuicioOral: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaJuicioOral',
      field        : 'fecha_juicio_oral'
    },
    // sentencia absolutoria
    idDelitoSentenciaAbsolutoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaAbsolutoria',
      field        : 'id_delito_sentencia_absolutoria'
    },
    fechaSentAbsolutoria: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSentAbsolutoria',
      field        : 'fecha_sent_absolutoria'
    },
    numeroSentencia: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroSentencia',
      field        : 'numero_sentencia'
    },
    idPresentoSentAbsolutoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idPresentoSentAbsolutoria',
      field        : 'id_presento_sent_absolutoria'
    },
    recursoSentAbsolutoria: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'recursoSentAbsolutoria',
      field        : 'recurso_sent_absolutoria'
    },
    // condenatoria
    idDelitoSentenciaCondenatoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaCondenatoria',
      field        : 'id_delito_sentencia_condenatoria'
    },
    fechaSentencia: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.fechaSentencia'),
      field        : 'fecha_sentencia'
    },
    aniosSentencia: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : 0,
      xlabel       : lang.t('fields.aniosSentencia'),
      field        : 'anios_sentencia'
    },
    mesesSentencia: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : 0,
      xlabel       : lang.t('fields.mesesSentencia'),
      field        : 'meses_sentencia'
    },
    diasMulta: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : 0,
      xlabel       : lang.t('fields.diasMulta'),
      field        : 'dias_multa'
    },
    idPenal: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idPenal',
      field        : 'id_penal'
    },
    // mixto
    idDelitoSentenciaCondenatoriaMixta: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaCondenatoriaMixta',
      field        : 'id_delito_sentencia_condenatoria_mixta'
    },
    idDelitoSentenciaAbsolutoriaMixta: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaAbsolutoriaMixta',
      field        : 'id_delito_sentencia_absolutoria_mixta'
    },
    fechaSentMixta: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSentMixta',
      field        : 'fecha_sent_mixta'
    },
    // recurso
    fechaPlanteamiento: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaPlanteamiento',
      field        : 'fecha_planteamiento'
    },
    fechaNotificacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaNotificacion',
      field        : 'fecha_notificacion'
    },
    // ejecucion
    autoInterlocutorio: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'autoInterlocutorio',
      field        : 'auto_interlocutorio'
    },
    seAtendio: {
      type         : DataTypes.BOOLEAN,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'seAtendio',
      field        : 'se_atendio'
    },
    nombreEtapaRol : {
      type         : DataTypes.ENUM,
      values       : ['ORIENTACION', 'PSICOLOGIA', 'SOCIAL', 'PATROCINIO'],
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.nombreEtapaRol'),
      field        : 'nombre_etapa_rol'
    },
    fechaInicio: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaInicio',
      field        : 'fecha_inicio'
    },
    fechaFin: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaFin',
      field        : 'fecha_fin'
    },
  };

  fields = util.setTimestamps(fields);

  const Seguimiento = sequelize.define('seguimiento', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'seguimiento'
  });

  return Seguimiento;
};
