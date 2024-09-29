'use strict';

const util = require('../../lib/util');
const lang = require('../../lang');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id            : util.pk,
    // lo que se va ------------------------------------
    areaGeografica: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'areaGeografica',
      field        : 'area_geografica'
    },
    idEtapaProcesal: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEtapaProcesal',
      field        : 'id_etapa_procesal'
    },
    idEtapaCaso: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEtapaCaso',
      field        : 'id_etapa_caso'
    },
    idCiudad: {
      type      : DataTypes.UUID,
      xlabel    : lang.t('fields.idCiudad'),
      allowNull : true,
      field     : 'id_ciudad'
    },
    condicion: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.condicion'),
      field     : 'condicion'
    },
    lugarDenuncia: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.lugarDenuncia'),
      field  : 'lugar_denuncia'
    },
    lugarHecho: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.lugarHecho'),
      field  : 'lugar_hecho'
    },
    numeroCasoMJTI: {
      type         : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.numeroCasoMJTI'),
      field        : 'numero_caso_mjti'
    },
    reservaIdentidad: {
      type   : DataTypes.INTEGER(11),
      xlabel : lang.t('fields.reservaIdentidad'),
      field  : 'reservaIdentidad'
    },
    //lo que se queda ----------------------------------
    idTipoProceso : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idTipoProceso'),
      field  : 'id_tipo_proceso'
    },
    idTipoOrigen: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idTipoOrigen',
      field        : 'id_tipo_origen'
    },
    idUsuarioAsignado: {
      type      : DataTypes.UUID,
      xlabel    : lang.t('fields.idUsuarioAsignado'),
      allowNull : false,
      field     : 'id_usuario_asignado'
    },
    fechaIngreso: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.fechaIngreso'),
      field        : 'fecha_ingreso'
    },
    idEstadoEsp: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idEstadoEsp',
      field        : 'id_estado_esp'
    },
    userCreated: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'userCreated',
      field        : 'user_created'
    },
    codigoDenuncia: {
      type      : DataTypes.STRING(100),
      allowNull    : true,
      defaultValue : null,
      xlabel    : lang.t('fields.codigoDenuncia'),
      field     : 'codigo_denuncia'
    },
    denominacion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.denominacion'),
      field  : 'denominacion'
    },
    observaciones: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.observaciones'),
      field  : 'observaciones' 
    },
    fechaDenuncia: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaDenuncia'),
      field  : 'fecha_denuncia'
    },
    fiscal: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.fiscal'),
      field  : 'fiscal'
    },
    juzgado: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.juzgado'),
      field  : 'juzgado'
    },
    nombreJuez: {
      type   : DataTypes.STRING(500),
      xlabel : lang.t('fields.nombreJuez'),
      field  : 'nombre_juez'
    },
    policia: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.policia'),
      field  : 'policia'
    },
    relacionHecho: {
      type   : DataTypes.STRING(250),
      xlabel : lang.t('fields.relacionHecho'),
      field  : 'relacion_hecho'
    },
    numeroFiscalia: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.numeroFiscalia'),
      field  : 'numero_fiscalia'
    },
    nurej: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.nurej'),
      field  : 'nurej'
    },
    estadoActual: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.estadoActual'),
      field     : 'estado_actual'
    },
    etapaActual: {
      type      : DataTypes.STRING(150),
      allowNull : true,
      xlabel    : lang.t('fields.etapaActual'),
      field     : 'etapa_actual'
    },
    etiquetas: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.etiquetas'),
      field     : 'etiquetas'
    },
    idEntidad: {
      type      : DataTypes.UUID,
      xlabel    : lang.t('fields.idEntidad'),
      allowNull : false,
      field     : 'id_entidad'
    },
    idTipoConclusion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idTipoConclusion',
      field        : 'id_tipo_conclusion'
    },
    idTipoConclusionHijo: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idTipoConclusionHijo',
      field        : 'id_tipo_conclusion_hijo'
    },
    casoConcluido: {
      type         : DataTypes.BOOLEAN,
      xlabel       : lang.t('fields.casoConcluido'),
      allowNull    : false,
      defaultValue : false,
      field        : 'caso_concluido'
    },
    justificacionCasoConcluido: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.justificacionCasoConcluido'),
      field        : 'justificacion_caso_concluido'
    },
    fechaConclusion: {
      type         : DataTypes.DATE,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.fechaConclusion'),
      field        : 'fecha_conclusion'
    },
    prioritario: {
      type         : DataTypes.BOOLEAN,
      allowNull    : false,
      defaultValue : false,
      xlabel       : 'prioritario',
      field        : 'prioritario'
    },
    codigoSaj: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.codigoSaj'),
      field        : 'codigo_saj'
    },
    idTipologiaFamiliar: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idTipologiaFamiliar',
      field        : 'id_tipologia_familiar'
    },
    idMiembroResponsable: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idMiembroResponsable'),
      field        : 'id_miembro_responsable'
    },
    ingresoMensualBeneficiario: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.ingresoMensualBeneficiario'),
      field        : 'ingreso_mensual_beneficiario'
    },
    egresoMensualBeneficiario: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.egresoMensualBeneficiario'),
      field        : 'egreso_mensual_beneficiario'
    },
    ingresoMensualResponsable: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.ingresoMensualResponsable'),
      field        : 'ingreso_mensual_responsable'
    },
    egresoMensualResponsable: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.egresoMensualResponsable'),
      field        : 'egreso_mensual_responsable'
    },
    montoVivienda: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.montoVivienda'),
      field        : 'monto_vivienda'
    },
    idDivisa: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idDivisa',
      field        : 'id_divisa'
    },
    idUsoHabitacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idUsoHabitacion',
      field        : 'id_uso_habitacion'
    },
    idSaludAtencion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idSaludAtencion',
      field        : 'id_salud_atencion'
    },
    idAntedecentesJudiciales: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : 'idAntedecentesJudiciales',
      field        : 'id_antedecentes_judiciales'
    },
    fechaCitacion: {
      type         : DataTypes.DATEONLY,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.fechaCitacion'),
      field        : 'fecha_citacion'
    },
    horaCitacion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.horaCitacion'),
      field        : 'hora_citacion'
    },
    correlativoGamea: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.correlativoGamea'),
      field        : 'correlativo_gamea'
    },
    nombreVictima: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.nombreVictima'),
      field        : 'nombre_victima'
    },
    documentoVictima: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.documentoVictima'),
      field        : 'documento_victima'
    },
    nombreDenunciante: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.nombreDenunciante'),
      field        : 'nombre_denunciante'
    },
    documentoDenunciante: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.documentoDenunciante'),
      field        : 'documento_denunciante'
    },
    nombreDenunciado: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.nombreDenunciado'),
      field        : 'nombre_denunciado'
    },
    reasonSlim: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.reasonSlim'),
      field        : 'reason_slim'
    },
    reasonDefensoria: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.reasonDefensoria'),
      field        : 'reason_defensoria'
    },
    documentoDenunciado: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.documentoDenunciado'),
      field        : 'documento_denunciado'
    },
    asignacionAnterior: {
      type         : DataTypes.ARRAY(DataTypes.UUID),
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.asignacionAnterior'),
      field        : 'asignacion_anterior'
    },
    idSlimDefensoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idSlimDefensoria'),
      field        : 'id_slim_defensoria'
    },

    idSlim: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idSlim'),
      field        : 'id_slim'
    },

    idDefensoria: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idDefensoria'),
      field        : 'id_defensoria'
    },
    idZona: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idZona'),
      field        : 'id_zona'
    },
    idFormaIngresoSlim: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idFormaIngresoSlim'),
      field        : 'id_forma_ingreso_slim'
    },
    idLugarAgresion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idLugarAgresion'),
      field        : 'id_lugar_agresion'
    },
    anterioridadOtraInstitucion: {
      type         : DataTypes.TEXT,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.anterioridadOtraInstitucion'),
      field        : 'anterioridad_otra_institucion'
    },
    idSlimReasignacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idSlimReasignacion'),
      field        : 'id_slim_reasignacion'
    },
    idDefensoriaReasignacion: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idDefensoriaReasignacion'),
      field        : 'id_defensoria_reasignacion'
    },
  };

  fields = util.setTimestamps(fields);

  const Denuncia = sequelize.define('denuncia', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'denuncia'
  });

  return Denuncia;
};
