'use strict';

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    rol,
    auth,
    usuario,
    permiso,
    entidad,
    rolPermiso,
    rolUsuario,
    rolMenu,
    menu,
    parametro,
    // DENUNCIAS
    Seguimiento,
    archivo,
    denuncia,
    denunciaDelito,
    bienesCautelados,
    participante,
    Proceso,
    Formulario,
    FormularioProceso,
    RolProceso,
    denunciaEntidad,
    DelitoPrecedente,
    historial,
    denunciaServicioBasico,
    denunciaTipoVivienda,
    grupoFamiliar,
    denunciaLlenadoRol,
    seguimientoParticipante,
    usuarioDefensoria,
    usuarioSlim,
    denunciaCheckPreliminar,
    denunciaCheckPreparatoria,
    denunciaDelitoPenal,
    denunciaViolenciaFisica,
    denunciaViolenciaPsicologica,
    denunciaViolenciaSexual
  } = models;

  menu.belongsTo(menu, { foreignKey: { name: 'idMenu' }, as: 'menuPadre' });
  menu.hasMany(menu,  { foreignKey: { name: 'idMenu' }, as: 'menus' });

  auth.belongsTo(usuario, { foreignKey: { name: 'idUsuario' }, as: 'usuario' });
  usuario.hasMany(auth,  { foreignKey: { name: 'idUsuario' }, as: 'sesiones' });

  rol.belongsTo(entidad, { foreignKey: { name: 'idEntidad' }, as: 'entidad' });
  entidad.hasMany(rol,  { foreignKey: { name: 'idEntidad' }, as: 'roles' });

  entidad.belongsTo(entidad, { foreignKey: { name: 'idEntidad' }, as: 'entidadPadre' });
  entidad.hasMany(entidad,  { foreignKey: { name: 'idEntidad' }, as: 'entidades' });

  usuario.belongsTo(entidad, { foreignKey: { name: 'idEntidad' }, as: 'entidad' });
  entidad.hasMany(usuario,  { foreignKey: { name: 'idEntidad' }, as: 'usuarios' });

  rol.belongsToMany(menu, { through: { model: rolMenu, unique: false }, as: 'menus', foreignKey: 'idRol' });
  menu.belongsToMany(rol, { through: { model: rolMenu, unique: false }, as: 'roles', foreignKey: 'idMenu' });

  rol.belongsToMany(permiso, { through: { model: rolPermiso, unique: false }, as: 'permisos', foreignKey: 'idRol' });
  permiso.belongsToMany(rol, { through: { model: rolPermiso, unique: false }, as: 'roles', foreignKey: 'idPermiso' });

  // Roles de usuario
  usuario.belongsToMany(rol,  { through: { model: rolUsuario, unique: false }, as: 'roles', foreignKey: 'idUsuario' });
  rol.belongsToMany(usuario, { through: { model: rolUsuario, unique: false }, as: 'usuarios', foreignKey: 'idRol' });

  auth.belongsTo(usuario, { foreignKey: { name: 'idUsuario' }, as: 'usuarioSesion' });
  usuario.hasMany(auth,  { foreignKey: { name: 'idUsuario' }, as: 'sesionesUsuario' });

  auth.belongsTo(entidad, { foreignKey: { name: 'idEntidad' }, as: 'entidadSesion' });
  entidad.hasMany(auth,  { foreignKey: { name: 'idEntidad' }, as: 'sesionesEntidad' });

  Seguimiento.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(Seguimiento, { foreignKey: { name: 'idDenuncia' }, as: 'seguimiento' });

  denuncia.belongsTo(usuario, { foreignKey: { name: 'idUsuarioAsignado' }, as: 'usuarioAsignado' });

  Seguimiento.belongsTo(usuario, { foreignKey: { name: '_user_created' }, as: 'usuarioCreacion' });

  archivo.belongsTo(Seguimiento, { foreignKey: { name: 'idSeguimiento' }, as: 'seguimiento' });
  Seguimiento.hasMany(archivo,  { foreignKey: { name: 'idSeguimiento' }, as: 'archivos' });

  participante.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(participante, { foreignKey: { name: 'idDenuncia' }, as: 'participantes' });

  bienesCautelados.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(bienesCautelados,  { foreignKey: { name: 'idDenuncia' }, as: 'bienesCautelados' });

  parametro.belongsToMany(denuncia, { through: { model: denunciaDelito, unique: false }, as: 'denuncias', foreignKey: 'idParametroDelito' });
  denuncia.belongsToMany(parametro, { through: { model: denunciaDelito, unique: false }, as: 'delitos', foreignKey: 'idDenuncia' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idTipoOrigen' }, as: 'tipoOrigen' });
  parametro.hasMany(denuncia, { foreignKey: { name: 'idTipoOrigen' }, as: 'denunciasOrigen' });

  entidad.belongsToMany(denuncia, { through: { model: denunciaEntidad, unique: false }, as: 'denuncias', foreignKey: 'idEntidad' });
  denuncia.belongsToMany(entidad, { through: { model: denunciaEntidad, unique: false }, as: 'entidades', foreignKey: 'idDenuncia' });

  parametro.belongsTo(Proceso, { foreignKey: { name: 'idProceso' }, as: 'proceso' });
  Proceso.hasMany(parametro,  { foreignKey: { name: 'idProceso' }, as: 'parametros' });

  denuncia.belongsTo(Proceso, { foreignKey: { name: 'idTipoProceso' }, as: 'proceso' });
  Proceso.hasMany(denuncia,  { foreignKey: { name: 'idTipoProceso' }, as: 'denuncias' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idEtapa' }, as: 'parametro' });
  parametro.hasOne(Seguimiento, { foreignKey: { name: 'idEtapa' }, as: 'seguimiento' });

  participante.belongsTo(parametro, { foreignKey: { name: 'idTipoParticipante' }, as: 'tipoParticipante' });
  parametro.hasOne(participante, { foreignKey: { name: 'idTipoParticipante' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idTipoAcompanamiento' }, as: 'tipoAcompanamiento' });
  parametro.hasOne(participante, { foreignKey: { name: 'idTipoAcompanamiento' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idGradoInstruccion' }, as: 'gradoInstruccion' });
  parametro.hasOne(participante, { foreignKey: { name: 'idGradoInstruccion' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idEstadoCivil' }, as: 'estadoCivil' });
  parametro.hasOne(participante, { foreignKey: { name: 'idEstadoCivil' } });
  

  //delitos
  /* participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoImputacion' }, as: 'delitoImputacion' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoImputacion' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoConImpugnacion' }, as: 'delitoConImpugnacion' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoConImpugnacion' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoSinImpugnacion' }, as: 'delitoSinImpugnacion' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoSinImpugnacion' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaAbsolutoria' }, as: 'delitoSentenciaAbsolutoria' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoSentenciaAbsolutoria' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaCondenatoria' }, as: 'delitoSentenciaCondenatoria' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoSentenciaCondenatoria' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaAbsolutoriaMixta' }, as: 'delitoSentenciaAbsolutoriaMixta' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoSentenciaAbsolutoriaMixta' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaCondenatoriaMixta' }, as: 'delitoSentenciaCondenatoriaMixta' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDelitoSentenciaCondenatoriaMixta' } }); */

  //-------------------------
  participante.belongsTo(parametro, { foreignKey: { name: 'idDirigidoActividad' }, as: 'dirigidoActividad' });
  parametro.hasOne(participante, { foreignKey: { name: 'idDirigidoActividad' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idEdadContencion' }, as: 'edadContencion' });
  parametro.hasOne(participante, { foreignKey: { name: 'idEdadContencion' } });

  bienesCautelados.belongsTo(parametro, { foreignKey: { name: 'idTipoBien' }, as: 'tipoBien' });
  parametro.hasOne(bienesCautelados, { foreignKey: { name: 'idTipoBien' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idTipoDocumento' }, as: 'tipoDocumento' });
  parametro.hasOne(participante, { foreignKey: { name: 'idTipoDocumento' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idComunidad' }, as: 'comunidad' });
  parametro.hasOne(participante, { foreignKey: { name: 'idComunidad' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idGenero' }, as: 'genero' });
  parametro.hasOne(participante,  { foreignKey: { name: 'idGenero' } });

  Formulario.belongsToMany(Proceso, { through: { model: FormularioProceso, unique: false }, as: 'procesos', foreignKey: 'idFormulario' });
  Proceso.belongsToMany(Formulario, { through: { model: FormularioProceso, unique: false }, as: 'formularios', foreignKey: 'idProceso' });

  rol.belongsToMany(Proceso, { through: { model: RolProceso, unique: false }, foreignKey: 'idRol' });
  Proceso.belongsToMany(rol, { through: { model: RolProceso, unique: false }, as: 'roles', foreignKey: 'idProceso' });

  DelitoPrecedente.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(DelitoPrecedente,  { foreignKey: { name: 'idDenuncia' }, as: 'delitosPrecedentes' });

  DelitoPrecedente.belongsTo(parametro, { foreignKey: { name: 'idDelitoPrecedente' }, as: 'delitoPrecedente' });
  parametro.hasMany(DelitoPrecedente,  { foreignKey: { name: 'idDelitoPrecedente' }, as: 'delitosPrecedentes' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idTipoConclusion' }, as: 'tipoConclusion' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idTipoConclusion' }, as: 'denunciasConcluidas' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idEtapaCaso' }, as: 'etapaCaso' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idEtapaCaso' } });

  permiso.belongsTo(menu, { foreignKey: { name: 'idMenu' }, as: 'menu' });
  menu.hasMany(permiso,  { foreignKey: { name: 'idMenu' }, as: 'permisos' });

  // historial asociacion
  denuncia.hasMany(historial, { foreignKey: { name: 'idDenuncia' }, as: 'historiales' });
  historial.belongsTo(denuncia,  { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });

  historial.belongsTo(usuario,  { foreignKey: { name: 'userCreated' }, as: 'usuario' });

  //ciudad asociacion
  denuncia.belongsTo(parametro, { foreignKey: { name: 'idCiudad' }, as: 'ciudad' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idCiudad' }, as: 'denunciaCiudades' });

  //denuncia alternativo
  denuncia.belongsTo(parametro, { foreignKey: { name: 'idTipoConclusionHijo' }, as: 'tipoConclusionHijo' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idTipoConclusionHijo' }, as: 'denunciaConclusionHijos' });

  //otras opciones para trabajo social

  parametro.belongsToMany(denuncia, { through: { model: denunciaServicioBasico, unique: false }, as: 'delitosServicioBasico', foreignKey: 'idParametroServicioBasico' });
  denuncia.belongsToMany(parametro, { through: { model: denunciaServicioBasico, unique: false }, as: 'servicioBasico', foreignKey: 'idDenuncia' });

  parametro.belongsToMany(denuncia, { through: { model: denunciaTipoVivienda, unique: false }, as: 'delitosTipoVivienda', foreignKey: 'idParametroTipoVivienda' });
  denuncia.belongsToMany(parametro, { through: { model: denunciaTipoVivienda, unique: false }, as: 'tipoVivienda', foreignKey: 'idDenuncia' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idTipologiaFamiliar' }, as: 'tipologiaFamiliar' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idTipologiaFamiliar' }, as: 'denunciaTipologiaFamiliar' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idMiembroResponsable' }, as: 'miembroResponsable' });
  parametro.hasMany(denuncia, { foreignKey: { name: 'idMiembroResponsable' } });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idDivisa' }, as: 'divisa' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idDivisa' }, as: 'denunciaDivisa' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idUsoHabitacion' }, as: 'usoHabitacion' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idUsoHabitacion' }, as: 'denunciaUsoHabitacion' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idSaludAtencion' }, as: 'saludAtencion' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idSaludAtencion' }, as: 'denunciaSaludAtencion' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idAntedecentesJudiciales' }, as: 'antedecentesJudiciales' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idAntedecentesJudiciales' }, as: 'denunciaAntedecentesJudiciales' });

  //GAMEA ADITIONS

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idSlimDefensoria' }, as: 'slimDefensoria' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idSlimDefensoria' }, as: 'denunciaSlimDefensoria' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idDefensoria' }, as: 'defensoria' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idDefensoria' }, as: 'denunciaDefensoria' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idSlim' }, as: 'slim' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idSlim' }, as: 'denunciaSlim' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idZona' }, as: 'zona' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idZona' }, as: 'denunciaZona' });

  // ------------ tipologia familiar

  grupoFamiliar.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(grupoFamiliar,  { foreignKey: { name: 'idDenuncia' }, as: 'denunciaGrupoFamiliar' });

  /* grupoFamiliar.belongsTo(parametro, { foreignKey: { name: 'idParentesco' }, as: 'parentesco' });
  parametro.hasOne(grupoFamiliar,  { foreignKey: { name: 'idParentesco' } });

  grupoFamiliar.belongsTo(parametro, { foreignKey: { name: 'idEstadoCivil' }, as: 'grupoEstadoCivil' });
  parametro.hasOne(grupoFamiliar,  { foreignKey: { name: 'idEstadoCivil' } }); */

  // ------------ 

  denunciaLlenadoRol.belongsTo(denuncia, { foreignKey: { name: 'idDenuncia' }, as: 'denuncia' });
  denuncia.hasMany(denunciaLlenadoRol,  { foreignKey: { name: 'idDenuncia' }, as: 'denunciaLlenadoRol' });

  denunciaLlenadoRol.belongsTo(usuario, { foreignKey: { name: 'idUsuarioAsignado' }, as: 'usuario' });
  usuario.hasMany(denunciaLlenadoRol,  { foreignKey: { name: 'idUsuarioAsignado' }, as: 'usuarioLlenadoRol' });

  // ------------------------------ verificar

  Seguimiento.belongsToMany(participante, { through: { model: seguimientoParticipante, unique: false }, as: 'participantes', foreignKey: 'idSeguimiento' });
  participante.belongsToMany(Seguimiento, { through: { model: seguimientoParticipante, unique: false }, as: 'seguimientos', foreignKey: 'idParticipante' });

  usuario.belongsToMany(parametro, { through: { model: usuarioSlim, unique: false }, as: 'slims', foreignKey: 'idUsuario' });
  parametro.belongsToMany(usuario, { through: { model: usuarioSlim, unique: false }, as: 'usuariosSlims', foreignKey: 'idParametroSlim' });

  usuario.belongsToMany(parametro, { through: { model: usuarioDefensoria, unique: false }, as: 'defensorias', foreignKey: 'idUsuario' });
  parametro.belongsToMany(usuario, { through: { model: usuarioDefensoria, unique: false }, as: 'usuariosDefensorias', foreignKey: 'idParametroDefensoria' });

  participante.belongsTo(parametro, { foreignKey: { name: 'idNacimientoSlim' }, as: 'nacimientoSlim' });
  parametro.hasMany(participante, { foreignKey: { name: 'idNacimientoSlim' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idResidenciaHabitual' }, as: 'residenciaHabitual' });
  parametro.hasMany(participante, { foreignKey: { name: 'idResidenciaHabitual' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idRelacionDenunciado' }, as: 'relacionDenunciado' });
  parametro.hasMany(participante, { foreignKey: { name: 'idRelacionDenunciado' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idCondicionesActividad' }, as: 'condicionesActividad' });
  parametro.hasMany(participante, { foreignKey: { name: 'idCondicionesActividad' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idIngresoEconomico' }, as: 'ingresoEconomico' });
  parametro.hasMany(participante, { foreignKey: { name: 'idIngresoEconomico' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idIdiomaHablado' }, as: 'idiomaHablado' });
  parametro.hasMany(participante, { foreignKey: { name: 'idIdiomaHablado' } });

  participante.belongsTo(parametro, { foreignKey: { name: 'idGestante' }, as: 'gestante' });
  parametro.hasMany(participante, { foreignKey: { name: 'idGestante' } });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idFormaIngresoSlim' }, as: 'FormaIngresoSlim' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idFormaIngresoSlim' }, as: 'denunciaFormaIngresoSlim' });

  denuncia.belongsTo(parametro, { foreignKey: { name: 'idLugarAgresion' }, as: 'lugarAgresion' });
  parametro.hasMany(denuncia,  { foreignKey: { name: 'idLugarAgresion' }, as: 'denunciaLugarAgresion' });

  //----------- revisar

  denuncia.belongsToMany(parametro, { through: { model: denunciaCheckPreliminar, unique: false }, as: 'checksPreliminar', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaCheckPreliminar, unique: false }, as: 'checksParametroPreliminar', foreignKey: 'idParametroCheckPreliminar' });

  denuncia.belongsToMany(parametro, { through: { model: denunciaCheckPreparatoria, unique: false }, as: 'checksPreparatoria', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaCheckPreparatoria, unique: false }, as: 'checksParametroPreparatoria', foreignKey: 'idParametroCheckPreparatoria' });

  //----------

  denuncia.belongsToMany(parametro, { through: { model: denunciaDelitoPenal, unique: false }, as: 'delitoPenalSlim', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaDelitoPenal, unique: false }, as: 'denunciaDelitoPenalSlim', foreignKey: 'idDPenalParametro' });

  denuncia.belongsToMany(parametro, { through: { model: denunciaViolenciaFisica, unique: false }, as: 'violenciaFisica', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaViolenciaFisica, unique: false }, as: 'denunciaViolenciaFisica', foreignKey: 'idVFisicaParametro' });

  denuncia.belongsToMany(parametro, { through: { model: denunciaViolenciaPsicologica, unique: false }, as: 'violenciaPsicologica', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaViolenciaPsicologica, unique: false }, as: 'denunciaViolenciaPsicologica', foreignKey: 'idVPsicologicaParametro' });

  denuncia.belongsToMany(parametro, { through: { model: denunciaViolenciaSexual, unique: false }, as: 'violenciaSexual', foreignKey: 'idDenuncia' });
  parametro.belongsToMany(denuncia, { through: { model: denunciaViolenciaSexual, unique: false }, as: 'denunciaViolenciaSexual', foreignKey: 'idVSexualParametro' });

  //----------- seguimiento

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoImputacion' }, as: 'delitoImputacion' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoImputacion' }, as: 'seguimientoDelitoImputacion' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoConImpugnacion' }, as: 'delitoConImpugnacion' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoConImpugnacion' }, as: 'seguimientoDelitoConImpugnacion' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoSinImpugnacion' }, as: 'delitoSinImpugnacion' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoSinImpugnacion' }, as: 'seguimientoDelitoSinImpugnacion' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaAbsolutoria' }, as: 'delitoSentenciaAbsolutoria' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoSentenciaAbsolutoria' }, as: 'seguimientoDelitoSentenciaAbsolutoria' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaCondenatoria' }, as: 'delitoSentenciaCondenatoria' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoSentenciaCondenatoria' }, as: 'seguimientoDelitoSentenciaCondenatoria' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaAbsolutoriaMixta' }, as: 'delitoSentenciaAbsolutoriaMixta' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoSentenciaAbsolutoriaMixta' }, as: 'seguimientoDelitoSentenciaAbsolutoriaMixta' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idDelitoSentenciaCondenatoriaMixta' }, as: 'delitoSentenciaCondenatoriaMixta' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idDelitoSentenciaCondenatoriaMixta' }, as: 'seguimientoDelitoSentenciaCondenatoriaMixta' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idMedidaCautelar' }, as: 'medidaCautelar' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idMedidaCautelar' }, as: 'seguimientoMedidaCautelar' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idPenal' }, as: 'penal' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idPenal' }, as: 'seguimientoPenal' });

  Seguimiento.belongsTo(parametro, { foreignKey: { name: 'idEtapaProcesal' }, as: 'etapaProcesal' });
  parametro.hasMany(Seguimiento, { foreignKey: { name: 'idEtapaProcesal' }, as: 'seguimientoEtapaProcesal' });

  return models;
};
