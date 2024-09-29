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
    nombreRazonSocial: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.nombreRazonSocial'),
      field  : 'nombre_razon_social'
    },
    razon: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.razon'),
      field  : 'razon'
    },
    nombreCompleto: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.nombreCompleto'),
      field     : 'nombre_completo'
    },
    denunciante: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.denunciante'),
      field  : 'denunciante'
    },
    telefonoDenunciante: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.telefonoDenunciante'),
      field  : 'telefono_denunciante'
    },
    numeroDocumento: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.numeroDocumento'),
      field  : 'numero_documento'
    },
    idTipoDocumento: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idTipoDocumento'),
      field  : 'id_tipo_documento'
    },
    idGenero: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idGenero'),
      field  : 'id_genero'
    },
    idComunidad: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idComunidad'),
      field  : 'id_comunidad'
    },
    direccion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.direccion'),
      field  : 'direccion'
    },
    telefono: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.telefono'),
      field  : 'telefono'
    },
    edadHecho: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.edadHecho'),
      field  : 'edad_hecho'
    },
    personaContacto: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.personaContacto'),
      field  : 'persona_contacto'
    },
    telefonoContacto: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.telefonoContacto'),
      field  : 'telefono_contacto'
    },
    ocupacion: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.ocupacion'),
      field  : 'ocupacion'
    },
    edad: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.edad'),
      field  : 'edad'
    },
    edadMeses: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.edadMeses'),
      field  : 'edad_meses'
    },
    idTipoParticipante: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idTipoParticipante'),
      field  : 'id_tipo_participante'
    },
    idSituacionJuridica: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idSituacionJuridica'),
      field        : 'id_situacion_juridica'
    },
    idMedidaCautelar: {
      type         : DataTypes.UUID, 
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idMedidaCautelar'),
      field        : 'id_medida_cautelar'
    },
    // PARA REPORTES
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
    estimacionMonetaria: {
      type         : DataTypes.DOUBLE,
      allowNull    : true,
      defaultValue : 0,
      xlabel       : lang.t('fields.estimacionMonetaria'),
      field        : 'estimacion_monetaria'
    },
    sentenciaAbsolutoria: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.sentenciaAbsolutoria'),
      field        : 'sentencia_absolutoria'
    },
    // NUEVOS CAMPOS
    idDelitoObjecion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoObjecion',
      field        : 'id_delito_objecion'
    },
    fechaRechazoCon: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaRechazoCon',
      field        : 'fecha_rechazo_con'
    },
    fechaRechazoSin: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaRechazoSin',
      field        : 'fecha_rechazo_sin'
    },
    fechaSentMixta: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSentMixta',
      field        : 'fecha_sent_mixta'
    },
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
    numeroResolucion: {
      type         : DataTypes.STRING(50),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucion',
      field        : 'numero_resolucion'
    },
    idDelitoImputacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoImputacion',
      field        : 'id_delito_imputacion'
    },
    fechaMedidaCautelar: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaMedidaCautelar',
      field        : 'fecha_medida_cautelar'
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
    fechaAudiencia: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAudiencia',
      field        : 'fecha_audiencia'
    },
    fechaImputacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaImputacion',
      field        : 'fecha_imputacion'
    },
    numeroImputacion: {
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroImputacion',
      field        : 'numero_imputacion'
    },
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
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucionConImpugnacion',
      field        : 'numero_resolucion_con_impugnacion'
    },
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
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroResolucionSinImpugnacion',
      field        : 'numero_resolucion_sin_impugnacion'
    },
    fechaAcusacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAcusacion',
      field        : 'fecha_acusacion'
    },
    numeroAcusacion: {
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroAcusacion',
      field        : 'numero_acusacion'
    },
    idActoPreparatorio: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idActoPreparatorio',
      field        : 'id_acto_preparatorio'
    },
    fechaJuicioOral: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaJuicioOral',
      field        : 'fecha_juicio_oral'
    },
    fechaSentAbsolutoria: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSentAbsolutoria',
      field        : 'fecha_sent_absolutoria'
    },
    idDelitoSentenciaAbsolutoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaAbsolutoria',
      field        : 'id_delito_sentencia_absolutoria'
    },
    fechaSentenciaAbsolutoria: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaSentenciaAbsolutoria',
      field        : 'fecha_sentencia_absolutoria'
    },
    numeroSentencia: {
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroSentencia',
      field        : 'numero_sentencia'
    },
    idEtapaProcesal: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEtapaProcesal',
      field        : 'id_etapa_procesal'
    },
    idEstadoImpugnacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEstadoImpugnacion',
      field        : 'id_estado_impugnacion'
    },
    sentenciaCondenatoria: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'sentenciaCondenatoria',
      field        : 'sentencia_condenatoria'
    },
    idDelitoSentenciaCondenatoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaCondenatoria',
      field        : 'id_delito_sentencia_condenatoria'
    },
    sentenciaMixta: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'sentenciaMixta',
      field        : 'sentencia_mixta'
    },
    idDelitoSentenciaAbsolutoriaMixta: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaAbsolutoriaMixta',
      field        : 'id_delito_sentencia_absolutoria_mixta'
    },
    idDelitoSentenciaCondenatoriaMixta: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDelitoSentenciaCondenatoriaMixta',
      field        : 'id_delito_sentencia_condenatoria_mixta'
    },
    autoInterlocutorio: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'autoInterlocutorio',
      field        : 'auto_interlocutorio'
    },
    //--------------------------------
    contencionEmocional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'contencionEmocional',
      field        : 'contencion_emocional'
    },
    numeroIntervencionContencion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroIntervencionContencion',
      field        : 'numero_intervencion_contencion'
    },
    fechaContencion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaContencion',
      field        : 'fecha_contencion'
    },
    horaIngresoContencion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaIngresoContencion',
      field        : 'hora_ingreso_contencion'
    },
    horaSalidaContencion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaSalidaContencion',
      field        : 'hora_salida_contencion'
    },
    desarrolloContencion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloContencion',
      field        : 'desarrollo_contencion'
    },
    acompanamientoVictima: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'acompanamientoVictima',
      field        : 'acompanamiento_victima'
    },
    numeroAcompanamiento: { 
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroAcompanamiento',
      field        : 'numero_acompanamiento'
    },
    detalleActuadoAcompanamiento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'detalleActuadoAcompanamiento',
      field        : 'detalle_actuado_acompanamiento'
    },
    fechaAcompanamiento: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaAcompanamiento',
      field        : 'fecha_Acompanamiento'
    },
    horaInicioAcompanamiento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaInicioAcompanamiento',
      field        : 'hora_inicio_acompanamiento'
    },
    horaFinAcompanamiento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaFinAcompanamiento',
      field        : 'hora_fin_acompanamiento'
    },
    desarrolloAcompanamiento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloAcompanamiento',
      field        : 'desarrollo_acompanamiento'
    },
    orientacionPsicoeducativa: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'orientacionPsicoeducativa',
      field        : 'orientacion_psicoeducativa'
    },
    numeroIntervencionOrientacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroIntervencionOrientacion',
      field        : 'numero_intervencion_orientacion'
    },
    fechaOrientacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaOrientacion',
      field        : 'fecha_orientacion'
    },
    horaInicioOrientacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaInicioOrientacion',
      field        : 'hora_inicio_orientacion'
    },
    horaFinOrientacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaFinOrientacion',
      field        : 'hora_fin_orientacion'
    },
    desarrolloOrientacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloOrientacion',
      field        : 'desarrollo_orientacion'
    },
    evaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'evaluacion',
      field        : 'evaluacion'
    },
    instrumentosEvaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'instrumentosEvaluacion',
      field        : 'instrumentos_evaluacion'
    },
    numeroEvaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroEvaluacion',
      field        : 'numero_evaluacion'
    },
    fechaEvaluacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaEvaluacion',
      field        : 'fecha_evaluacion'
    },
    horaInicioEvaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaInicioEvaluacion',
      field        : 'hora_inicio_evaluacion'
    },
    horaFinEvaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaFinEvaluacion',
      field        : 'hora_fin_evaluacion'
    },
    desarrolloEvaluacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloEvaluacion',
      field        : 'desarrollo_evaluacion'
    },
    terapiaPsicologica: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'terapiaPsicologica',
      field        : 'terapia_psicologica'
    },
    enfoqueTerapia: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'enfoqueTerapia',
      field        : 'enfoque_terapia'
    },
    numeroIntervencionTerapeutico: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroIntervencionTerapeutico',
      field        : 'numero_intervencion_terapeutico'
    },
    fechaTerapeutico: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaTerapeutico',
      field        : 'fecha_terapeutico'
    },
    horaInicioTerapeutico: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaInicioTerapeutico',
      field        : 'hora_inicio_terapeutico'
    },
    horaFinTerapeutico: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaFinTerapeutico',
      field        : 'hora_fin_terapeutico'
    },
    desarrolloTerapeutico: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloTerapeutico',
      field        : 'desarrollo_terapeutico'
    },
    actividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'actividad',
      field        : 'actividad'
    },
    nombreActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'nombreActividad',
      field        : 'nombre_actividad'
    },
    objetivoActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'objetivoActividad',
      field        : 'objetivo_actividad'
    },
    responsableActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'responsableActividad',
      field        : 'responsable_actividad'
    },
    idDirigidoActividad: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDirigidoActividad',
      field        : 'id_dirigido_actividad'
    },
    especificarActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'especificarActividad',
      field        : 'especificar_actividad'
    },
    numeroActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numeroActividad',
      field        : 'numero_actividad'
    },
    fechaActividad: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaActividad',
      field        : 'fecha_actividad'
    },
    horaInicioActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaInicioActividad',
      field        : 'hora_inicio_actividad'
    },
    horaFinActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'horaFinActividad',
      field        : 'hora_fin_actividad'
    },
    desarrolloActividad: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'desarrolloActividad',
      field        : 'desarrollo_actividad'
    },
    coordinacionInterinstitucional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'coordinacionInterinstitucional',
      field        : 'coordinacion_interinstitucional'
    },
    aInterinstitucional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'aInterinstitucional',
      field        : 'a_interinstitucional'
    },
    deInterinstitucional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'deInterinstitucional',
      field        : 'de_interinstitucional'
    },
    referenciaInterinstitucional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'referenciaInterinstitucional',
      field        : 'referencia_interinstitucional'
    },
    descripcionInterinstitucional: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'descripcionInterinstitucional',
      field        : 'descripcion_interinstitucional'
    },
    idEdadContencion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEdadContencion',
      field        : 'id_edad_contencion'
    },
    idTipoAcompanamiento: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idTipoAcompanamiento',
      field        : 'id_tipo_acompanamiento'
    },
    idGradoInstruccion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idGradoInstruccion',
      field        : 'id_grado_instruccion'
    },
    idEstadoCivil: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEstadoCivil',
      field        : 'id_estado_civil'
    },
    direccionLaboral: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'direccionLaboral',
      field        : 'direccion_laboral'
    },
    // agregado -- reciente
    fechaNacimiento: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'fechaNacimiento',
      field        : 'fecha_nacimiento'
    },
    idNacimientoSlim: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idNacimientoSlim',
      field        : 'id_nacimiento_slim'
    },
    especifiqueNacimiento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'especifiqueNacimiento',
      field        : 'especifique_nacimiento'
    },
    idResidenciaHabitual: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idResidenciaHabitual',
      field        : 'id_residencia_habitual'
    },
    especifiqueResidencia: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'especifiqueResidencia',
      field        : 'especifique_residencia'
    },
    idRelacionDenunciado: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idRelacionDenunciado',
      field        : 'id_relacion_denunciado'
    },
    hijos: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'hijos',
      field        : 'hijos'
    },
    educativoEspecifique: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'educativoEspecifique',
      field        : 'educativo_especifique'
    },
    idCondicionesActividad: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idCondicionesActividad',
      field        : 'id_condiciones_actividad',
    },
    condicionesActividadEspecifique: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'condicionesActividadEspecifique',
      field        : 'condiciones_actividad_especifique'
    },
    idIngresoEconomico: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idIngresoEconomico',
      field        : 'id_ingreso_economico',
    },
    ingresoEconomicoEspecifique: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'ingresoEconomicoEspecifique',
      field        : 'ingreso_economico_especifique'
    },
    idIdiomaHablado: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idIdiomaHablado',
      field        : 'id_idioma_hablado',
    },
    departamento: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'departamento',
      field        : 'departamento'
    },
    provincia: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'provincia',
      field        : 'provincia'
    },
    municipio: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'municipio',
      field        : 'municipio'
    },
    zona: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'zona',
      field        : 'zona'
    },
    calle: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'calle',
      field        : 'calle'
    },
    numero: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'numero',
      field        : 'numero'
    },
    idGestante: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idGestante',
      field        : 'id_estante',
    },
    tipoTrabajo: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'tipoTrabajo',
      field        : 'tipo_trabajo'
    },
    latitud: {
      type         : DataTypes.DOUBLE,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'latitud',
      field        : 'latitud'
    },
    longitud: {
      type         : DataTypes.DOUBLE,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'longitud',
      field        : 'longitud'
    },
  };

  fields = util.setTimestamps(fields);

  const Participante = sequelize.define('participante', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'participante'
  });

  return Participante;
};
