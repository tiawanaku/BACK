'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');
const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');
const moment = require('moment');
const { query } = require('express');
const axios = require('axios');
const { DATOS_SAJ, ROLES_ID, TIPOPROCESO} = require('../../../common/config/constants');

module.exports = function denunciaService (repositories, helpers, res) {
  const {
    DenunciaRepository,
    ParticipanteRepository,
    UsuarioRepository,
    ParametroRepository,
    DenunciaDelitoRepository,
    transaction,
    HistorialRepository,
    DenunciaServicioBasicoRepository,
    DenunciaTipoViviendaRepository,
    RolRepository,
    GrupoFamiliarRepository,
    CorrelativoGameaRepository,
    DenunciaLlenadoRolRepository,
    PsicologiaHeaderRepository,
    SocialHeaderRepository,
    OrientacionHeaderRepository,
    FormularioRepository,
    DenunciaDelitoPenalRepository,
    DenunciaViolenciaFisicaRepository,
    DenunciaViolenciaPsicologicaRepository,
    DenunciaViolenciaSexualRepository
  } = repositories;
  const SeguimientoService = require('./SeguimientoService')(repositories, helpers, res);

  async function listar (params) {
    try {
      const comentarios = await DenunciaRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const denuncia = await DenunciaRepository.findOne(params);
      if (!denuncia) {
        throw new Error('La denuncia no existe');
      }
      return denuncia;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findById (id) {
    try {
      const denuncia = await DenunciaRepository.findByUUID(id);

      if (!denuncia) {
        throw new Error('La denuncia no existe');
      }
      return denuncia;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar denuncia');
    let denuncia;
    let transaccion;
    let trabajo = '';
    let agregado = false;
    try {
      transaccion = await transaction.create();

      if(data.codigoDenuncia){
        let formatearCodigo = data.codigoDenuncia.trim();
        if(!formatearCodigo){
          throw new Error('Debe de llenar el código de fiscalía correctamente');
        }
        data.codigoDenuncia = formatearCodigo;
      }
      
      if (!data.fechaCitacion) {
        delete data.fechaCitacion
      }

      const verificacionCodigo = await DenunciaRepository.findOne({
        codigoDenuncia: data.codigoDenuncia || null
      });

      if(verificacionCodigo && verificacionCodigo.codigoDenuncia && !data.id) {
        if (verificacionCodigo.codigoDenuncia == data.codigoDenuncia) throw new Error('Código de denuncia de fiscalía está repetido');
      }

      if(verificacionCodigo && verificacionCodigo.codigoDenuncia && data.id) {
        if (verificacionCodigo.id != data.id) throw new Error('Ya existe otra denuncia con este numero de caso');
      }

      const verificacionSaj = await DenunciaRepository.findOne({
        codigoSaj: data.codigoSaj || null
      });

      if(data.codigoSaj && verificacionSaj && verificacionSaj.codigoSaj && !data.id) {
        if (verificacionSaj.codigoSaj == data.codigoSaj) throw new Error('Código SAJ ya se encuentra registrado');
      }

      if(!data.id){
        const correlativo =await CorrelativoGameaRepository.findOne();
        data.correlativoGamea =await armarCorrelativo(correlativo);
        correlativo.contador+=1;
        delete correlativo.createdAt;
        delete correlativo.updatedAt;
        await CorrelativoGameaRepository.createOrUpdate(correlativo,transaccion);
      }

      // CAMBIAR
      let estadoActual = 'ORIENTACIÓN';
      if(data.idEtapaCaso){
        const ecaso = await ParametroRepository.findOne({id: data.idEtapaCaso});
        estadoActual = ecaso.nombre;
      }

      data.estadoActual = estadoActual;

      if (data.idDefensoria) {
        data.idSlim = null;
        const resultado = data.defensorias.find(dat=>{return data.idDefensoria == dat});
        if (!resultado) throw new Error('Solo puedes agregar casos en tus distritos asignados');
      } else if (data.idSlim) {
        data.idDefensoria = null;
        const resultado = data.slims.find(dat=>{return data.idSlim == dat});
        if (!resultado) throw new Error('Solo puedes agregar casos en tus distritos asignados');
      }

      for (let z = 0; z < data.participantes.length; z++) {
        const elm = data.participantes[z];
        const mapa = elm['mapa'];
        if (mapa) {
          data.participantes[z].departamento = mapa.departamento?.nombre;
          data.participantes[z].provincia = mapa.provincia?.nombre;
          data.participantes[z].municipio = mapa.municipio?.nombre;
          data.participantes[z].zona = mapa.zona?.nombre;
          data.participantes[z].calle = mapa.calle;
          data.participantes[z].numero = mapa.numero;
          data.participantes[z].latitud = mapa.latitud;
          data.participantes[z].longitud = mapa.longitud;
        }
      }

      if (data.id) {
        const verificacion = await DenunciaRepository.findByUUID(data.id);
        if (data.codigoSaj && verificacion.codigoSaj != data.codigoSaj) throw new Error('El código SAJ no es el mismo');

        const cambios = await verificarCambios(data, verificacion);

        for (let z = 0; z < cambios.length; z++) {
          const elm = cambios[z];
          trabajo += `(${elm.campo} - ${elm.valor}) `;
          await HistorialRepository.createOrUpdate(elm, transaccion);
        }

        if (cambios.length == 0) {

          const {ABOGADO, PSICOLOGIA, SOCIAL, VENTANILLA} = ROLES_ID;

          const form = data.rolActual == ABOGADO ? 'Patrocinio Legal' :
            data.rolActual == PSICOLOGIA ? 'Psicología' :
            data.rolActual == SOCIAL ? 'Trabajo Social' :
            data.rolActual == VENTANILLA ? 'Orientación' : 'Formulario sin rol';

          const historial = {
            idDenuncia: data.id,
            campo: 'Formulario guardado',
            valor: form,
            userCreated: data.userUpdated
          }

          trabajo += `(Formulario guardado - ${form})`;

          await HistorialRepository.createOrUpdate(historial, transaccion);
        }

      } else {
        agregado = true;
        trabajo += '(Formulario guardado - Orientación)';
      }

      if (data.ciudad) {
        let parametro = await ParametroRepository.findOne({id:data.idCiudad});
        data.idCiudad = parametro.id;
      }

      if (data.participantes) {
        let nombreVictima = '';
        let documentoVictima = '';
        let nombreDenunciante = '';
        let documentoDenunciante = '';
        let nombreDenunciado = '';
        let documentoDenunciado = '';
        for (const participante of data.participantes) {
          const tipo =await ParametroRepository.findOne({id: participante.idTipoParticipante});
          switch (tipo.nombre) {
            case 'VICTIMA':
              nombreVictima += participante.nombreCompleto+' ';
              documentoVictima += participante.numeroDocumento+' ';
              break;
            case 'DENUNCIANTE':
              nombreDenunciante += participante.nombreCompleto+' ';
              documentoDenunciante += participante.numeroDocumento+' ';
              break;
            case 'DENUNCIADO':
              nombreDenunciado += participante.nombreCompleto+' ';
              documentoDenunciado += participante.numeroDocumento+' ';
              break;
            default:
              break;
          }
        }
        data.nombreVictima = nombreVictima;
        data.documentoVictima = documentoVictima;
        data.nombreDenunciante = nombreDenunciante;
        data.documentoDenunciante = documentoDenunciante;
        data.nombreDenunciado = nombreDenunciado;
        data.documentoDenunciado = documentoDenunciado;
      }

      /* if (data.idSlimGamea && data.participantes && data.participantes.length > 0) {
        const slimDefensoria = await ParametroRepository.findOne({id: data.idSlimGamea});
        const genero = await ParametroRepository.findOne({id: data.idGenero});
        if (!genero) throw new ErrorApp('Debe de rellenar el género por favor', 404);
        if (slimDefensoria.nombre == 'SLIM') {
          // if (genero.nombre != 'FEMENINO') throw new ErrorApp('Para acceder a SLIM el sexo debe de ser FEMENINO', 404);
          data.idDefensoria = null;
        } else {
          data.idSlim = null;
        }
      } */
      denuncia = await DenunciaRepository.createOrUpdate(data, transaccion);
      if (data.delitos) {
        if(data.id) {
          const {rows} = await DenunciaDelitoRepository.findAll({idDenuncia: denuncia.id});
          const eliminar = rows.filter( elm=> !data.delitos.includes(elm.idParametroDelito));
          const agregar = data.delitos.filter( elm => !rows.some(elm2=> elm2.idParametroDelito == elm));

          for (let z = 0; z < eliminar.length; z++) {
            const elm = eliminar[z];
            await DenunciaDelitoRepository.deleteItem(elm.id, transaccion);
          }

          for (let z = 0; z < agregar.length; z++) {
            const elm = agregar[z];
            await DenunciaDelitoRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idParametroDelito : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        } else {
          for (let z = 0; z < data.delitos.length; z++) {
            const elm = data.delitos[z];
            await DenunciaDelitoRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idParametroDelito : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        }
      }

      if (data.violenciaFisica) {
        if(data.id) {
          const {rows} = await DenunciaViolenciaFisicaRepository.findAll({idDenuncia: denuncia.id});
          const eliminar = rows.filter( elm=> !data.violenciaFisica.includes(elm.idVFisicaParametro));
          const agregar = data.violenciaFisica.filter( elm => !rows.some(elm2=> elm2.idVFisicaParametro == elm));

          for (let z = 0; z < eliminar.length; z++) {
            const elm = eliminar[z];
            await DenunciaViolenciaFisicaRepository.deleteItem(elm.id, transaccion);
          }

          for (let z = 0; z < agregar.length; z++) {
            const elm = agregar[z];
            await DenunciaViolenciaFisicaRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVFisicaParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        } else {
          for (let z = 0; z < data.violenciaFisica.length; z++) {
            const elm = data.violenciaFisica[z];
            await DenunciaDelitoRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVFisicaParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        }
      }

      if (data.violenciaPsicologica) {
        if(data.id) {
          const {rows} = await DenunciaViolenciaPsicologicaRepository.findAll({idDenuncia: denuncia.id});
          const eliminar = rows.filter( elm=> !data.violenciaPsicologica.includes(elm.idVPsicologicaParametro));
          const agregar = data.violenciaPsicologica.filter( elm => !rows.some(elm2=> elm2.idVPsicologicaParametro == elm));

          for (let z = 0; z < eliminar.length; z++) {
            const elm = eliminar[z];
            await DenunciaViolenciaPsicologicaRepository.deleteItem(elm.id, transaccion);
          }

          for (let z = 0; z < agregar.length; z++) {
            const elm = agregar[z];
            await DenunciaViolenciaPsicologicaRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVPsicologicaParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        } else {
          for (let z = 0; z < data.violenciaPsicologica.length; z++) {
            const elm = data.violenciaPsicologica[z];
            await DenunciaViolenciaPsicologicaRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVPsicologicaParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        }
      }

      if (data.violenciaSexual) {
        if(data.id) {
          const {rows} = await DenunciaViolenciaSexualRepository.findAll({idDenuncia: denuncia.id});
          const eliminar = rows.filter( elm=> !data.violenciaSexual.includes(elm.idVSexualParametro));
          const agregar = data.violenciaSexual.filter( elm => !rows.some(elm2=> elm2.idVSexualParametro == elm));

          for (let z = 0; z < eliminar.length; z++) {
            const elm = eliminar[z];
            await DenunciaViolenciaSexualRepository.deleteItem(elm.id, transaccion);
          }

          for (let z = 0; z < agregar.length; z++) {
            const elm = agregar[z];
            await DenunciaViolenciaSexualRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVSexualParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        } else {
          for (let z = 0; z < data.violenciaSexual.length; z++) {
            const elm = data.violenciaSexual[z];
            await DenunciaViolenciaSexualRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idVSexualParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        }
      }

      if (data.delitoPenalSlim) {
        if(data.id) {
          const {rows} = await DenunciaDelitoPenalRepository.findAll({idDenuncia: denuncia.id});
          const eliminar = rows.filter( elm=> !data.delitoPenalSlim.includes(elm.idDPenalParametro));
          const agregar = data.delitoPenalSlim.filter( elm => !rows.some(elm2=> elm2.idDPenalParametro == elm));

          for (let z = 0; z < eliminar.length; z++) {
            const elm = eliminar[z];
            await DenunciaDelitoPenalRepository.deleteItem(elm.id, transaccion);
          }

          for (let z = 0; z < agregar.length; z++) {
            const elm = agregar[z];
            await DenunciaDelitoPenalRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idDPenalParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        } else {
          for (let z = 0; z < data.delitoPenalSlim.length; z++) {
            const elm = data.delitoPenalSlim[z];
            await DenunciaDelitoPenalRepository.createOrUpdate({
              idDenuncia        : denuncia.id,
              idDPenalParametro : elm,
              userCreated       : data.userCreated || data.userUpdated
            }, transaccion);
          }
        }
      }

      if (data.tipoVivienda && data.rolActual == ROLES_ID.SOCIAL) {
        const {rows} = await DenunciaTipoViviendaRepository.findAll({idDenuncia: denuncia.id});

        const eliminar = rows.filter( elm=> !data.tipoVivienda.includes(elm.idParametroTipoVivienda));
        const agregar = data.tipoVivienda.filter( elm => !rows.some(elm2=> elm2.idParametroTipoVivienda == elm));

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await DenunciaTipoViviendaRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await DenunciaTipoViviendaRepository.createOrUpdate({
            idDenuncia        : denuncia.id,
            idParametroTipoVivienda : elm,
            userCreated       : data.userCreated || data.userUpdated
          }, transaccion);
        }

      } else delete data.tipoVivienda;

      if (data.servicioBasico && data.rolActual == ROLES_ID.SOCIAL) {
        const {rows} = await DenunciaServicioBasicoRepository.findAll({idDenuncia: denuncia.id});
        
        const eliminar = rows.filter( elm=> !data.servicioBasico.includes(elm.idParametroServicioBasico));
        const agregar = data.servicioBasico.filter( elm => !rows.some(elm2=> elm2.idParametroServicioBasico == elm));

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await DenunciaServicioBasicoRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await DenunciaServicioBasicoRepository.createOrUpdate({
            idDenuncia        : denuncia.id,
            idParametroServicioBasico : elm,
            userCreated       : data.userCreated || data.userUpdated
          }, transaccion);
        }

      } else delete data.servicioBasico;
      
      if (data.participantes) {
        const {rows} = await ParticipanteRepository.findAll({idDenuncia: denuncia.id});
        let resultado = rows.filter(obj1 => !data.participantes.some(obj2 => obj1.id === obj2.id));  
        for (let z = 0; z < resultado.length; z++) {
          const elm = resultado[z];
          await ParticipanteRepository.deleteItem(elm.id, transaccion);
        }
        for (const participante of data.participantes) {
          if(!esUUID(participante.id)) {
            delete participante.id;
            participante.userCreated = data.userCreated || data.userUpdated;
          } else {
            delete participante.createdAt;
          }
          participante.idDenuncia = denuncia.id;
          await ParticipanteRepository.createOrUpdate(participante, transaccion);
        }
      }
      
      if (data.denunciaGrupoFamiliar && data.denunciaGrupoFamiliar.length > 0 && data.rolActual == ROLES_ID.SOCIAL) {

        const {rows} = await GrupoFamiliarRepository.findAll({idDenuncia: denuncia.id});
        let resultado = rows.filter(obj1 => !data.denunciaGrupoFamiliar.some(obj2 => obj1.id === obj2.id));        
        for (let z = 0; z < resultado.length; z++) {
          const elm = resultado[z];
          await GrupoFamiliarRepository.deleteItem(elm.id, transaccion);
        }
        for (const tipologia of data.denunciaGrupoFamiliar) {
          if(!esUUID(tipologia.id)) {
            delete tipologia.id;
            tipologia.userCreated = data.userCreated || data.userUpdated;
          } else {
            delete tipologia.createdAt;
          }
          tipologia.idDenuncia = denuncia.id;
          await GrupoFamiliarRepository.createOrUpdate(tipologia, transaccion);
        }
       
      } else delete data.denunciaGrupoFamiliar;

      if (agregado) {
        const historial = {
          idDenuncia: denuncia.id,
          campo: 'Formulario guardado',
          valor: 'Orientación',
          userCreated: data.userCreated || data.userUpdated
        }

        await HistorialRepository.createOrUpdate(historial, transaccion);
      }
      
      if (!data.id) {
        transaccion = await SeguimientoService.createOrUpdate({
          idDenuncia     : denuncia.id,
          estadoDenuncia : 'REGISTRADO',
          etapaDenuncia  : 'REGISTRADO',
          userCreated    : data.userCreated || data.userUpdated,
          fechaActuacion : new Date(),
          actuacion      : 'Se registro la denuncia.',
          rolActual      : data.rolActual
        }, transaccion);

        const _existeUsuario = await UsuarioRepository.findOne({ id: data.idUsuarioAsignado });
        if (!_existeUsuario) {
          throw new Error('No existe el usuario a asignar.');
        }

        const nombreUsuaraioAsignar = `${_existeUsuario.nombres || ''} ${_existeUsuario.primerApellido || ''} ${_existeUsuario.segundoApellido || ''}`;
        transaccion = await SeguimientoService.createOrUpdate({
          idDenuncia        : denuncia.id,
          estadoDenuncia    : 'ASIGNADO',
          etapaDenuncia     : 'ASIGNADO',
          idUsuarioAsignado : data.idUsuarioAsignado,
          userCreated       : data.userCreated || data.userUpdated,
          fechaActuacion    : new Date(),
          actuacion         : `Se asigno la denucia a ${nombreUsuaraioAsignar}.`,
          rolActual      : data.rolActual
        }, transaccion);

        transaccion = await SeguimientoService.createOrUpdate({
          idDenuncia     : denuncia.id,
          estadoDenuncia : estadoActual,
          etapaDenuncia  : 'APERTURA',
          // estadoDenuncia : 'APERTURADO',
          // etapaDenuncia  : 'APERTURADO',
          userCreated    : data.userCreated || data.userUpdated,
          fechaActuacion : new Date(),
          actuacion      : 'Se derivó la denuncia para apertura.',
          rolActual      : data.rolActual
        }, transaccion);
      }

      if (data.rolActual && (denuncia.idUsuarioAsignado == data.userCreated || denuncia.idUsuarioAsignado == data.userUpdated)) {
        const rol = await RolRepository.findById(data.rolActual);
        
        const {rows: cambiar} = await DenunciaLlenadoRolRepository.findAll({
          idUsuarioAsignado: denuncia.idUsuarioAsignado,
          estado: 'ACTIVO',
          idDenuncia: denuncia.id
        });

        for (let z = 0; z < cambiar.length; z++) {
          const elm = cambiar[z];
          elm.estado = 'INACTIVO';
          delete elm.updatedAt;
          delete elm.createdAt;
          await DenunciaLlenadoRolRepository.createOrUpdate(elm,transaccion);
        }

        const llenadorol = {
          idRol: rol.id,
          idDenuncia: denuncia.id,
          nombreRol: rol.nombre,
          idUsuarioAsignado: denuncia.idUsuarioAsignado,
          estado: 'ACTIVO',
          userCreated: data.userCreated || data.userUpdated,
          trabajo
        };
        await DenunciaLlenadoRolRepository.createOrUpdate(llenadorol,transaccion);

      }

      await transaction.commit(transaccion);
      return denuncia;
    } catch (err) {
      console.log('==========_MENSAJE_A_MOSTRARSE_==========');
      console.log(err);
      console.log('==========_MENSAJE_A_MOSTRARSE_==========');
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function verificarCambios(data, verificacion) {

    const diferencias = [];

    const { rows: participantes } = await ParticipanteRepository.findAll({idDenuncia: verificacion.id});
    const { rows: grupoFamiliar } = await GrupoFamiliarRepository.findAll({idDenuncia: verificacion.id});

    const cambios = [];

    const { rows: formularios } = await FormularioRepository.findForms();
    const forms = [];    
    for (let z = 0; z < formularios.length; z++) {
      const elm = formularios[z];
      elm.configuracion.forEach(conf=>{
        
        if(conf.type == 'datagrid') {
          conf.options.forEach(opt=>{
            forms.push({
              clave: opt.name,
              label: opt.label
            });
          });
        } else {
          forms.push({
            clave: conf.name,
            label: conf.label
          });
        }

      });
    }

    if (data.participantes) {
      
      const { agregados, eliminados, verificarUpdate } = filterAgregadosEliminadosIds(data.participantes, participantes);

      if ( agregados.length > 0 ) {
        for (let z = 0; z < agregados.length; z++) {
          const elm = agregados[z];
          diferencias.push({
            idDenuncia: data.id,
            campo: 'Participante',
            valor: `Se agregó Participante: ${elm.nombreCompleto ? elm.nombreCompleto : ''} - ${elm.numeroDocumento ? elm.numeroDocumento : ''}`,
            userCreated: data.userUpdated
          });
        }
      }

      if ( eliminados.length > 0 ) {
        for (let z = 0; z < eliminados.length; z++) {
          const elm = eliminados[z];
          const elim = participantes.find(dat=>{return dat.id == elm});
          const array = [];
          for (let clave in elim) {
            if (elim.hasOwnProperty(clave)) {
              let valor = elim[clave];
              if (typeof valor !== "object") {
                array.push({
                  clave,
                  valor,
                  esUuid: esUUID(valor)
                })
              }
            }
          }
          let strResult = '';
          for (let z = 0; z < array.length; z++) {
            const elm = array[z];
            if (elm.valor && elm.clave != 'id') {
              const key = forms.find((form)=>{
                return form.clave == elm.clave
              });
              if(key) {
                strResult += `* Se eliminó ${key.label} - ${elm.esUuid ? await getNombre(elm.valor) : elm.valor} \n`
              }
            } 
          }
          diferencias.push({
            idDenuncia: data.id,
            campo: 'Participante',
            valor: strResult,
            userCreated: data.userUpdated
          });
        }
      }
      
      if (verificarUpdate.length > 0) {   
        for (let z = 0; z < verificarUpdate.length; z++) {
          const elm = verificarUpdate[z];
          const verif = participantes.find(dat=>{return dat.id == elm.id});
          const array = [];
          for (let clave in verif) {
            if (verif.hasOwnProperty(clave)) {
              let valor = verif[clave];
              if (typeof valor !== "object") {
                array.push({
                  clave,
                  valor,
                  esUuid: esUUID(valor)
                })
              }
            }
          }

          for (let z = 0; z < elm.cambios.length; z++) {
            const dat = elm.cambios[z];
            const elmt = array.find(e=>{ return e.clave == dat.clave});
            if (elmt) {
              if (dat.valor && elmt.valor && (elmt.valor !== dat.valor)) {
                const key = forms.find((form)=>{
                  return form.clave == dat.clave
                });
                if (key) {
                  let anterior = elmt.valor && dat.esUuid?await getNombre(elmt.valor):elmt.valor;
                  let cambioNuevo =  dat.esUuid?await getNombre(dat.valor):dat.valor;
                  
                  diferencias.push({
                    idDenuncia: data.id,
                    campo: key.label,
                    valor: elmt.valor ? `${anterior} cambio a ${cambioNuevo}` : cambioNuevo,
                    userCreated: data.userUpdated
                  });
                }
              }
            }
          }
        }
      }
    }

    // delete data.participantes;

    if (data.delitos) {
      const {agregados, eliminados} = await filterAgregados(data.delitos, verificacion.delitos);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'delitos'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    if (data.violenciaFisica) {
      const {agregados, eliminados} = await filterAgregados(data.violenciaFisica, verificacion.violenciaFisica);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'violenciaFisica'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    if (data.violenciaPsicologica) {
      const {agregados, eliminados} = await filterAgregados(data.violenciaPsicologica, verificacion.violenciaPsicologica);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'violenciaPsicologica'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    if (data.violenciaSexual) {
      const {agregados, eliminados} = await filterAgregados(data.violenciaSexual, verificacion.violenciaSexual);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'violenciaSexual'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    if (data.delitoPenalSlim) {
      const {agregados, eliminados} = await filterAgregados(data.delitoPenalSlim, verificacion.delitoPenalSlim);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'delitoPenalSlim'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    // delete data.delitos;

    if (data.tipoVivienda && data.rolActual == ROLES_ID.SOCIAL) {
      const {agregados, eliminados} = await filterAgregados(data.tipoVivienda, verificacion.tipoVivienda);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'tipoVivienda'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    // delete data.tipoVivienda;

    if (data.servicioBasico && data.rolActual == ROLES_ID.SOCIAL) {
      const {agregados, eliminados} = await filterAgregados(data.servicioBasico, verificacion.servicioBasico);
      let concat = '';
      for (let z = 0; z < agregados.length; z++) {
        const elm = agregados[z];
        concat += `${elm} `
      }
      const key = forms.find((form)=>{
        return form.clave == 'servicioBasico'
      });
      if(agregados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se agregó ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
      concat = '';
      for (let z = 0; z < eliminados.length; z++) {
        const elm = eliminados[z];
        concat += `${elm} `
      }
      if(eliminados.length > 0) {
        diferencias.push({
          idDenuncia: data.id,
          campo: key.label,
          valor: `Se retiró ${key.label}: ${concat}`,
          userCreated: data.userUpdated
        });
      }
    }

    // delete data.servicioBasico;

    if (data.denunciaGrupoFamiliar && data.rolActual == ROLES_ID.SOCIAL) {
      const { agregados, eliminados, verificarUpdate } = filterAgregadosEliminadosIds(data.denunciaGrupoFamiliar, grupoFamiliar);

      if ( agregados.length > 0 ) {
        for (let z = 0; z < agregados.length; z++) {
          const elm = agregados[z];
          diferencias.push({
            idDenuncia: data.id,
            campo: 'Grupo Familiar',
            valor: `Se agregó: ${elm.nombreCompleto ? elm.nombreCompleto : ''} - ${elm.numeroDocumento ? elm.numeroDocumento : ''}`,
            userCreated: data.userUpdated
          });
        }
      }

      if ( eliminados.length > 0 ) {
        for (let z = 0; z < eliminados.length; z++) {
          const elm = eliminados[z];
          const elim = grupoFamiliar.find(dat=>{return dat.id == elm});
          const array = [];
          for (let clave in elim) {
            if (elim.hasOwnProperty(clave)) {
              let valor = elim[clave];
              if (typeof valor !== "object") {
                array.push({
                  clave,
                  valor,
                  esUuid: esUUID(valor)
                })
              }
            }
          }
          let strResult = '';
          for (let z = 0; z < array.length; z++) {
            const elm = array[z];
            if (elm.valor && elm.clave != 'id') {
              const key = forms.find((form)=>{
                return form.clave == elm.clave
              });
              if(key) {
                strResult += `* Se eliminó ${key.label} - ${elm.esUuid ? await getNombre(elm.valor) : elm.valor} \n`
              }
            } 
          }
          diferencias.push({
            idDenuncia: data.id,
            campo: 'Grupo Familiar',
            valor: strResult,
            userCreated: data.userUpdated
          });
        }
      }
      
      if (verificarUpdate.length > 0) {   
        for (let z = 0; z < verificarUpdate.length; z++) {
          const elm = verificarUpdate[z];
          const verif = grupoFamiliar.find(dat=>{return dat.id == elm.id});
          const array = [];
          for (let clave in verif) {
            if (verif.hasOwnProperty(clave)) {
              let valor = verif[clave];
              if (typeof valor !== "object") {
                array.push({
                  clave,
                  valor,
                  esUuid: esUUID(valor)
                })
              }
            }
          }

          for (let z = 0; z < elm.cambios.length; z++) {
            const dat = elm.cambios[z];
            const elmt = array.find(e=>{ return e.clave == dat.clave});
            if (elmt) {
              if (elmt.valor !== dat.valor) {
                const key = forms.find((form)=>{
                  return form.clave == dat.clave
                });
                if (key) {
                  let anterior = elmt.valor && dat.esUuid?await getNombre(elmt.valor):elmt.valor;
                  let cambioNuevo =  dat.esUuid?await getNombre(dat.valor):dat.valor;
                  
                  diferencias.push({
                    idDenuncia: data.id,
                    campo: key.label,
                    valor: elmt.valor ? `${anterior} cambio a ${cambioNuevo}` : cambioNuevo,
                    userCreated: data.userUpdated
                  });
                }
              }
            }
          }
        }
      }
    }

    // delete data.denunciaGrupoFamiliar;

    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        let valor = data[clave];
        if (typeof valor !== "object" && !Array.isArray(valor)) {
          cambios.push({
            clave,
            valor,
            esUuid: esUUID(valor)
          })
        }
      }
    }

    for (let z = 0; z < cambios.length; z++) {
      const dat = cambios[z];
      if (verificacion.hasOwnProperty(dat.clave)) {
        if (verificacion[dat.clave] !== dat.valor) {
          const key = forms.find((form)=>{
            return form.clave == dat.clave
          });
          if (key) {
            let anterior = verificacion[dat.clave] && dat.esUuid?await getNombre(verificacion[dat.clave]):verificacion[dat.clave];
            let cambioNuevo =  dat.esUuid?await getNombre(dat.valor):dat.valor;
            if (verificacion[dat.clave]) {
              diferencias.push({
                idDenuncia: data.id,
                campo: key.label,
                valor: `${anterior} cambio a ${cambioNuevo}`,
                userCreated: data.userUpdated
              });
            }
          }
        }
      }
    }
    return diferencias;
  }

  async function controlAbogadoTrabajo () {

  }

  async function filterAgregados (arr1, arr2){
    const agregados = [];
    for (let z = 0; z < arr1.length; z++) {
      const elm = arr1[z];
      const index = arr2.findIndex((dat)=>{return dat.id === elm});
      if (index == -1) {
        agregados.push(await getNombre(elm));
      }
    }
    const eliminados = [];
    for (let z = 0; z < arr2.length; z++) {
      const elm = arr2[z];
      const index = arr1.findIndex((dat)=>{return dat === elm.id});
      if (index == -1) {
        eliminados.push(elm.nombre);
      }
    }
    return {
      agregados,
      eliminados
    }
  }

  function filterAgregadosEliminadosIds (arr1, arr2){
    const agregados = [];
    const verificarUpdate = [];
    for (let z = 0; z < arr1.length; z++) {
      const elm = arr1[z];
      const index = arr2.findIndex((dat)=>{return dat.id === elm.id});
      if (index == -1) {
        agregados.push({
          nombreCompleto: elm.nombreCompleto,
          numeroDocumento: elm.numeroDocumento
        });
      } else {
        const cambios = [];
        for (let clave in elm) {
          if (elm.hasOwnProperty(clave)) {
            let valor = elm[clave];
            cambios.push({
              clave,
              valor,
              esUuid: esUUID(valor)
            })
          }
        }
        verificarUpdate.push({
          id: elm.id,
          cambios
        });
      }
    }
    const eliminados = [];
    for (let z = 0; z < arr2.length; z++) {
      const elm = arr2[z];
      const index = arr1.findIndex((dat)=>{return dat.id === elm.id});
      if (index == -1) {
        eliminados.push(elm.id);
      }
    }
    return {
      agregados,
      eliminados,
      verificarUpdate
    }
  }

  async function getNombre(uuid) {
    const param = await ParametroRepository.findOne({id: uuid});
    return param?.nombre;
  }

  function esUUID(str) {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(str);
  }

  async function habilitarTrabajoSocial (data) {
    let transaccion;
    try {
      transaccion = await transaction.create();
      const _existeDenuncia = await DenunciaRepository.findByUUID(data.idDenuncia);

      if (!_existeDenuncia) {
        throw new Error('No existe la denuncia a reasignar.');
      }

      const index = _existeDenuncia.asignacionAnterior.findIndex(dat=>{return data.idUsuarioAsignado == dat});

      if(index!=-1)throw new ErrorApp('Ya puede editar tu usuario este caso, prueba recargando la pagina', 400);

      let denuncia = await DenunciaRepository.createOrUpdate({
        id                : _existeDenuncia.id,
        asignacionAnterior: _existeDenuncia.asignacionAnterior.concat([data.idUsuarioAsignado])
      }, transaccion);

      await transaction.commit(transaccion);
      return denuncia;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  /* async function reasignarDenunciaEnMasa (data) {
    let transaccion;
    try {
      transaccion = await transaction.create();

      const usuarioDenuncia = await UsuarioRepository.findOne({ id: data.idUsuarioAsignado, estado: 'INACTIVO' });

      if (!usuarioDenuncia) {
        throw new Error('No existe el usuario para reasignar');
      }

      const _existeUsuario = await UsuarioRepository.findOne({ id: data.idUsuarioAAsignar });

      if (!_existeUsuario) {
        throw new Error('No existe el usuario para asignar');
      }

      const nombreUsuarioAnterior = `${usuarioDenuncia.nombres || ''} ${usuarioDenuncia.primerApellido || ''} ${usuarioDenuncia.segundoApellido || ''}`;
      const nombreUsuarioNuevo = `${_existeUsuario.nombres || ''} ${_existeUsuario.primerApellido || ''} ${_existeUsuario.segundoApellido || ''}`;

      const denuncias = await DenunciaRepository.findAll({idUsuarioAsignado: usuarioDenuncia.id});

      for (let z = 0; z < denuncias.rows.length; z++) {
        const elm = denuncias.rows[z];
        let denuncia;
        if (elm.estadoActual !== 'CERRADO') {

          denuncia = await DenunciaRepository.createOrUpdate({
            id                : data.idDenuncia,
            idUsuarioAsignado : nombreUsuarioNuevo.id,
          }, transaccion);

          transaccion = await SeguimientoService.createOrUpdate({
            idDenuncia        :  elm.id,
            estadoDenuncia    : 'REASIGNADO',
            etapaDenuncia     : 'REASIGNADO',
            idUsuarioAsignado :  nombreUsuarioNuevo.id,
            userCreated       :  data.userUpdated,
            fechaActuacion    :  new Date(),
            actuacion         :  `Se reasigno la denuncia de ${nombreUsuarioAnterior} a ${nombreUsuarioNuevo}.`
          }, transaccion, false);
        }
      }

      await transaction.commit(transaccion);
      return {mensaje: 'se pudo'};
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  } */

  async function reasignarDenuncia (data) {
    let transaccion;
    try {
      transaccion = await transaction.create();
      const _existeDenuncia = await DenunciaRepository.findByUUID(data.idDenuncia);

      if (!_existeDenuncia) {
        throw new Error('No existe la denuncia a reasignar.');
      }

      let actualizarReasignacion;

      if (_existeDenuncia.idDefensoriaReasignacion) {
        _existeDenuncia.idDefensoria = _existeDenuncia.idDefensoriaReasignacion;
        actualizarReasignacion = {
          id: _existeDenuncia.id,
          idDefensoria: _existeDenuncia.idDefensoriaReasignacion,
          idDefensoriaReasignacion: null
        }
      }

      if (_existeDenuncia.idSlimReasignacion) {
        _existeDenuncia.idSlim = _existeDenuncia.idSlimReasignacion;
        actualizarReasignacion = {
          id: _existeDenuncia.id,
          idSlim: _existeDenuncia.idSlimReasignacion,
          idSlimReasignacion: null
        }
      }

      if (_existeDenuncia.estadoActual === 'CERRADO') {
        throw new Error('La denuncia fue cerrada, no puede reasignarse.');
      }

      const _existeUsuario = await UsuarioRepository.findOne({ id: data.idUsuarioAsignado });

      if (!_existeUsuario) {
        throw new Error('No existe el usuario a asignar');
      }

      const denunciaAsignacion = await DenunciaRepository.findOne({id: data.idDenuncia});
      
      let denuncia;
      if (denunciaAsignacion && denunciaAsignacion.idUsuarioAsignado) 
        denuncia = await DenunciaRepository.createOrUpdate({
          id                : data.idDenuncia,
          idUsuarioAsignado : data.idUsuarioAsignado,
          asignacionAnterior: denunciaAsignacion.asignacionAnterior.concat([denunciaAsignacion.idUsuarioAsignado])
        }, transaccion);
      else
        denuncia = await DenunciaRepository.createOrUpdate({
          id                : data.idDenuncia,
          idUsuarioAsignado : data.idUsuarioAsignado,
        }, transaccion);

      const usuarioDenuncia = _existeDenuncia.usuarioAsignado;

      /* const nivelUsuarioActual = usuarioDenuncia.nivel;
      const nivelUsuarioNuevo = _existeUsuario.nivel;

      switch (nivelUsuarioActual) {
        case 'BAJO':
          if (nivelUsuarioNuevo == 'BAJO') {
            throw new ErrorApp('No se puede reasignar al usuario del mismo nivel, se sugiere reasignar a quien corresponda', 400);
          }
          if (nivelUsuarioNuevo == 'ALTO') {
            throw new ErrorApp('No se puede reasignar al usuario del nivel mas alto, se sugiere reasignar a quien corresponda', 400);
          }
          break;
        case 'MEDIO':
          if (nivelUsuarioNuevo == 'MEDIO') {
            throw new ErrorApp('No se puede reasignar al usuario del mismo nivel, se sugiere reasignar a quien corresponda', 400);
          }
          break;
        default:
          break;
      } */

      const {IDPROCESODEFENSORIA,IDPROCESOSLIM} = TIPOPROCESO;

      const defensorias = _existeUsuario.defensorias.map(item => item.id);
      const slims = _existeUsuario.slims.map(item => item.id);
      
      if (IDPROCESODEFENSORIA == data.idProceso) {
        if (_existeDenuncia.idDefensoria && !defensorias.includes(_existeDenuncia.idDefensoria)) {
          throw new ErrorApp(`El usuario al que quiere reasignar el caso, no esta habilitado a la Defensoria, revise el caso por favor`, 400);
        } else if (!_existeDenuncia.idDefensoria) throw new ErrorApp('El caso no esta asignado a una DEFENSORÍA', 400);
      } else if (IDPROCESOSLIM == data.idProceso) {
        if (_existeDenuncia.idSlim && !slims.includes(_existeDenuncia.idSlim)) {
          throw new ErrorApp(`El usuario al que quiere reasignar el caso, no esta habilitado al Slim, revise el caso por favor`, 400);
        } else if (!_existeDenuncia.idSlim) throw new ErrorApp('El caso no esta asignado a un SLIM', 400);
      } else throw new ErrorApp('No pertenece a ningun proceso', 400);

      const nombreUsuarioAnterior = `${usuarioDenuncia.nombres || ''} ${usuarioDenuncia.primerApellido || ''} ${usuarioDenuncia.segundoApellido || ''}`;
      const nombreUsuarioNuevo = `${_existeUsuario.nombres || ''} ${_existeUsuario.primerApellido || ''} ${_existeUsuario.segundoApellido || ''}`;

      transaccion = await SeguimientoService.createOrUpdate({
        idDenuncia        : denuncia.id,
        estadoDenuncia    : 'REASIGNADO',
        etapaDenuncia     : 'REASIGNADO',
        idUsuarioAsignado : data.idUsuarioAsignado,
        userCreated       : data.userUpdated,
        fechaActuacion    : new Date(),
        actuacion         : `Se reasigno la denuncia de ${nombreUsuarioAnterior} a ${nombreUsuarioNuevo}.`,
        rolActual         : data.rolActual
      }, transaccion, false);

      if (actualizarReasignacion) await DenunciaRepository.createOrUpdate(actualizarReasignacion,transaccion);

      await transaction.commit(transaccion);
      return denuncia;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    try {
      const resultado = await DenunciaRepository.deleteItemCond(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function armarCorrelativo (data) {
    try {
      return `${data.entidad}/${data.gestion}/${data.contador}`;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reportesDenuncia (params) {
    try {
      const resultado = await DenunciaRepository.reportesDenuncia(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function cerrarDenuncia (datos) {
    try {
      const resultado = await SeguimientoService.createOrUpdate({
        idDenuncia     : datos.id,
        estadoDenuncia : datos.estadoActual,
        etapaDenuncia  : datos.etapaActual,
        userCreated    : datos.userUpdated,
        fechaActuacion : new Date(),
        actuacion      : 'Se cerro la denuncia.'
      });
      return resultado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function _generatePDF (html, width = '216mm', height = '330mm', footer = null) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          width,
          height,
          border : {
            top    : '5mm',
            right  : '5mm',
            bottom : '5mm',
            left   : '5mm'
          },
          phantomArgs: ['--ignore-ssl-errors=yes'],
          footer
        };
        pdf.create(html, options).toBuffer((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async function reporteDenuncia (id, idUsuario, idRol, nro, idParticipante, idParametro) {
    try {
      const rol =await RolRepository.findOne({id:idRol});
      switch (rol.nombre) {
        case 'ABOGADO': return await reporteDenunciaAbogado(id, idUsuario, nro, idParticipante, idParametro);
        case 'VENTANILLA': return await reporteDenunciaVentanilla(id, idUsuario, nro, idParticipante, idParametro);
        case 'SOCIAL': return await reporteDenunciaSocial(id, idUsuario, nro, idParticipante, idParametro);
        case 'PSICOLOGIA': return await reporteDenunciaPsicologia(id, idUsuario, nro, idParticipante, idParametro);
        default:
          break;
      }
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteDenunciaPsicologia (id, idUsuario, nro, idParticipante, idParametro) {
    // const rootPath = config.app.path;
    try {
      switch (nro) {
        case '1': return await reportePsicologia1(id, idUsuario, idParticipante);
        case '2': return await reportePsicologia2(id, idUsuario, idParticipante);
        case '3': return await reportePsicologia3(id, idUsuario, idParticipante);
        case '4': return await reportePsicologia4(id, idUsuario, idParticipante);
        case '5': return await reportePsicologia5(id, idUsuario, idParticipante);
        case '6': return await reportePsicologia6(id, idUsuario, idParticipante);
        case '7': return await reportePsicologia7(id, idUsuario, idParticipante);
        case '8': return await reportePsicologia8(id, idUsuario, idParticipante);
        case '9': return await reporteCoordinacionInterinstitucional(id, idUsuario, idParametro);
        case '10': return await reporteAbogado1(id, idUsuario, idParticipante);
        default: return null;
      }
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia1 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'CONTENCION'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaContencionEmocional.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia2 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'ACOMPANAMIENTO'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaAcompanamiento.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia3 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'ORIENTACION'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaOrientacion.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia4 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'EVALUACION'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaEvaluacion.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia5 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'TERAPIA'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaTerapia.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia6 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'ACTIVIDAD'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaActividad.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia7 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      const { rows: headers } = await PsicologiaHeaderRepository.findAll({tipo: 'COORDINACION'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/psicologiaCoordinacion.ejs`, {
        victima: victimas[0],
        imagen,
        denuncia: _existeDenuncia,
        header: headers[0]
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reportePsicologia8 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      let imagen2 = fs.readFileSync(`${config.app.imagenParaPdf}/logo_el_alto.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      imagen2 = `data:image/png;base64,${imagen2}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/citacion.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia,
        imagen,
        usuario: _existeUsuario,
        imagen2
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteDenunciaVentanilla (id, idUsuario, nro, idParticipante, idParametro) {
    switch (nro) {
      case '1': return await reporteVentanilla1(id, idUsuario, idParticipante);
      case '2': return await reporteVentanilla2(id, idUsuario, idParticipante);
      case '3': return await reporteVentanilla3(id, idUsuario, idParticipante);
      case '4': return await reporteVentanilla4(id, idUsuario, idParticipante);
      case '5': return await reporteCoordinacionInterinstitucional(id, idUsuario, idParametro);
      case '6': return await reporteAbogado1(id, idUsuario, idParticipante);
      default: return null;
    }
  }

  

  async function reporteVentanilla1 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      for (const seguimiento of _existeDenuncia.seguimiento) {
        seguimiento.fechaActuacion = moment(seguimiento.fechaActuacion, 'YYYY-MM-DD').format('DD-MM-YYYY');
      }

      const { rows: headers } = await OrientacionHeaderRepository.findAll({tipo: 'FORMULARIO'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/ventanilla.ejs`, {
        denuncia: _existeDenuncia,
        victimas,
        header: headers[0],
        imagen
      });
      const respuesta = await _generatePDF(html, '216mm', '330mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteVentanilla2 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      let imagen2 = fs.readFileSync(`${config.app.imagenParaPdf}/logo_el_alto.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      imagen2 = `data:image/png;base64,${imagen2}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/citacion.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia,
        imagen,
        usuario: _existeUsuario,
        imagen2
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteVentanilla3 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: solicitante } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(solicitante.length == 0) throw new Error('La víctima no existe.');

      const {rows: grupoFamiliar} = await GrupoFamiliarRepository.findAll({idDenuncia:_existeDenuncia.id});

      const { rows: tiposParticipante } = await ParametroRepository.findAll({ grupo: 'TIPO_PARTICIPANTE_SLIM', idProceso: _existeDenuncia.idTipoProceso });

      const denunciante = tiposParticipante.find(x => x.nombre === 'DENUNCIANTE');
      const victima = tiposParticipante.find(x => x.nombre === 'VICTIMA');
      const denunciado = tiposParticipante.find(x => x.nombre === 'DENUNCIADO');

      const {rows: denunciantes} = await ParticipanteRepository.findAll({idTipoParticipante: denunciante.id, idDenuncia: _existeDenuncia.id});
      const {rows: denunciados} = await ParticipanteRepository.findAll({idTipoParticipante: denunciado.id, idDenuncia: _existeDenuncia.id});
      const {rows: victimas} = await ParticipanteRepository.findAll({idTipoParticipante: victima.id, idDenuncia: _existeDenuncia.id});
      
      
      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      
      const html = await ejs.renderFile(`${rootPath}/../../views/inicioSlim.ejs`, {
        solicitante: solicitante[0],
        usuario: _existeUsuario,
        denuncia: _existeDenuncia,
        grupoFamiliar,
        denunciantes,
        denunciados,
        victimas,
        imagen
      });

      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteVentanilla4 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: solicitante } = await ParticipanteRepository.findAll({id: idParticipante});

      const {rows: grupoFamiliar} = await GrupoFamiliarRepository.findAll({idDenuncia:_existeDenuncia.id});

      if(solicitante.length == 0) throw new Error('La víctima no existe.');

      const { rows: tiposParticipante } = await ParametroRepository.findAll({ grupo: 'TIPO_PARTICIPANTE', idProceso: _existeDenuncia.idTipoProceso });

      const denunciante = tiposParticipante.find(x => x.nombre === 'DENUNCIANTE');
      const victima = tiposParticipante.find(x => x.nombre === 'VICTIMA');
      const denunciado = tiposParticipante.find(x => x.nombre === 'DENUNCIADO');

      const {rows: denunciantes} = await ParticipanteRepository.findAll({idTipoParticipante: denunciante.id, idDenuncia: _existeDenuncia.id});
      const {rows: denunciados} = await ParticipanteRepository.findAll({idTipoParticipante: denunciado.id, idDenuncia: _existeDenuncia.id});
      const {rows: victimas} = await ParticipanteRepository.findAll({idTipoParticipante: victima.id, idDenuncia: _existeDenuncia.id});

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/inicioDefensoria.ejs`, {
        solicitante: solicitante[0],
        denuncia: _existeDenuncia,
        usuario: _existeUsuario,
        grupoFamiliar,
        denunciantes,
        denunciados,
        victimas,
        imagen
      });

      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });

      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteDenunciaSocial (id, idUsuario, nro, idParticipante, idParametro) {
    switch (nro) {
      case '1': return await reporteSocial1(id, idUsuario, idParticipante);
      case '2': return await reporteSocial2(id, idUsuario, idParticipante);
      case '3': return await reporteSocial3(id, idUsuario, idParticipante);
      case '4': return await reporteSocial4(id, idUsuario, idParticipante);
      case '5': return await reporteCoordinacionInterinstitucional(id, idUsuario, idParametro);
      case '6': return await reporteAbogado1(id, idUsuario, idParticipante);
      default: return null;
    }
  }

  async function reporteSocial4 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/socialIncumplimiento.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteSocial3 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/socialInasistencia.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteSocial2 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      let imagen2 = fs.readFileSync(`${config.app.imagenParaPdf}/logo_el_alto.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      imagen2 = `data:image/png;base64,${imagen2}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/socialCitacion.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia,
        imagen,
        usuario: _existeUsuario,
        imagen2
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteSocial1 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }
      
      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      for (const seguimiento of _existeDenuncia.seguimiento) {
        seguimiento.fechaActuacion = moment(seguimiento.fechaActuacion, 'YYYY-MM-DD').format('DD-MM-YYYY');
      }

      const { rows: tipoVivienda } = await ParametroRepository.findAll({ grupo: 'TIPO_VIVIENDA_GAMEA', idProceso: _existeDenuncia.idTipoProceso });
      const {rows: denunciaTipoVivienda} = await DenunciaTipoViviendaRepository.findAll({idDenuncia:_existeDenuncia.id});
      
      const tipoVidiendaResult = [];

      denunciaTipoVivienda.forEach(data=>{
        const index = tipoVivienda.findIndex(dat=>{return dat.id == data.idParametroTipoVivienda});
        if (index !=-1 ) {
          tipoVidiendaResult.push(tipoVivienda[index]);
        }
      });

      const { rows: serviciobasico } = await ParametroRepository.findAll({ grupo: 'SERVICIO_BASICO_GAMEA', idProceso: _existeDenuncia.idTipoProceso });
      const {rows: denunciaServicioBasico} = await DenunciaServicioBasicoRepository.findAll({idDenuncia:_existeDenuncia.id});
      
      const serviciobasicoResult = [];

      denunciaServicioBasico.forEach(data=>{
        const index = serviciobasico.findIndex(dat=>{return dat.id == data.idParametroServicioBasico});
        if (index !=-1 ) {
          serviciobasicoResult.push(serviciobasico[index]);
        }
      });

      const {rows: grupoFamiliar} = await GrupoFamiliarRepository.findAll({idDenuncia:_existeDenuncia.id});

      const { rows: headers } = await SocialHeaderRepository.findAll({tipo: 'FORMULARIO'});
      
      if(headers.length == 0) throw new Error('El formulario no tiene cabecera');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf2.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;

      const html = await ejs.renderFile(`${rootPath}/../../views/social.ejs`, {
        denuncia: _existeDenuncia,
        victimas: [victimas[0]],
        imagen,
        tipovivienda: tipoVidiendaResult,
        servicioBasico: serviciobasicoResult,
        grupoFamiliar,
        header: headers[0]
      });
      
      const respuesta = await _generatePDF(html, '216mm', '330mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 8px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteDenunciaAbogado (id, idUsuario, nro, idParticipante, idParametro) {
    switch (nro) {
      case '1': return await reporteAbogado1(id, idUsuario, idParticipante);
      case '2': return await reporteAbogado2(id, idUsuario, idParticipante);
      case '3': return await reporteCoordinacionInterinstitucional(id, idUsuario, idParametro);
      default: return null;
    }
  }

  async function reporteAbogado1 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);
      
      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }
      const { rows: tiposParticipante } = await ParametroRepository.findAll({ grupo: 'TIPO_PARTICIPANTE', idProceso: _existeDenuncia.idTipoProceso });
      
      const denunciante = tiposParticipante.find(x => x.nombre === 'DENUNCIANTE');
      const victima = tiposParticipante.find(x => x.nombre === 'VICTIMA');
      const denunciado = tiposParticipante.find(x => x.nombre === 'DENUNCIADO');

      const denunciantes = _existeDenuncia.participantes.filter(x => x.idTipoParticipante ===  denunciante?.id);
      const denunciados = _existeDenuncia.participantes.filter(x => x.idTipoParticipante === denunciado?.id);
      const victimas = _existeDenuncia.participantes.filter(x => x.idTipoParticipante === victima?.id);

      for (const seguimiento of _existeDenuncia.seguimiento) {
        seguimiento.fechaActuacion = seguimiento.fechaFin ? moment(seguimiento.fechaFin, 'YYYY-MM-DD').format('DD-MM-YYYY') : '';
      }

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/denuncia.ejs`, {
        denuncia: _existeDenuncia,
        denunciantes,
        denunciados,
        victimas,
        imagen
      });
      const respuesta = await _generatePDF(html, '216mm', '330mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteAbogado2 (id, idUsuario, idParticipante) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const { rows: victimas } = await ParticipanteRepository.findAll({id: idParticipante});
      
      if(victimas.length == 0) throw new Error('La víctima no existe.');

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      let imagen2 = fs.readFileSync(`${config.app.imagenParaPdf}/logo_el_alto.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      imagen2 = `data:image/png;base64,${imagen2}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/citacion.ejs`, {
        victima: victimas[0],
        denuncia: _existeDenuncia,
        imagen,
        usuario: _existeUsuario,
        imagen2
      });
      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reporteCoordinacionInterinstitucional(id, idUsuario, idParametro) {
    const rootPath = config.app.path;
    try {
      const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario });

      if (!_existeUsuario) {
        throw new Error('El usuario que esta generando el reporte no existe o esta deshailitado.');
      }

      const _existeDenuncia = await DenunciaRepository.findByUUID(id);

      if (!_existeDenuncia) {
        throw new Error('La denuncia no existe.');
      }

      const opcion = await ParametroRepository.findOne({id: idParametro});
      
      if (!opcion) {
        throw new Error('No existe la opcion a derivar.');
      }

      const {IDPROCESODEFENSORIA, IDPROCESOSLIM} = TIPOPROCESO;
      
      const { rows: tiposParticipante } = await ParametroRepository.findAll({ grupo: IDPROCESODEFENSORIA == _existeDenuncia.idTipoProceso ? 'TIPO_PARTICIPANTE' : 'TIPO_PARTICIPANTE_SLIM', idProceso: _existeDenuncia.idTipoProceso });
      
      const denunciante = tiposParticipante.find(x => x.nombre === 'DENUNCIANTE');
      const victima = tiposParticipante.find(x => x.nombre === 'VICTIMA');
      const denunciado = tiposParticipante.find(x => x.nombre === 'DENUNCIADO');

      const {rows: denunciantes} = await ParticipanteRepository.findAll({idTipoParticipante: denunciante.id, idDenuncia: _existeDenuncia.id});
      const {rows: denunciados} = await ParticipanteRepository.findAll({idTipoParticipante: denunciado.id, idDenuncia: _existeDenuncia.id});
      const {rows: victimas} = await ParticipanteRepository.findAll({idTipoParticipante: victima.id, idDenuncia: _existeDenuncia.id}); 

      let imagen = fs.readFileSync(`${config.app.imagenParaPdf}/logo_pdf.png`, 'base64');
      imagen = `data:image/png;base64,${imagen}`;
      const html = await ejs.renderFile(`${rootPath}/../../views/coordinacionInterinstitucuonal.ejs`, {
        victimas,
        denunciados,
        denunciantes,
        opcion,
        imagen,
        denuncia: _existeDenuncia
      });
      let actualizarDerivacion;
      if (IDPROCESODEFENSORIA == _existeDenuncia.idTipoProceso) {
        actualizarDerivacion = {
          id: _existeDenuncia.id,
          idDefensoriaReasignacion: idParametro
        }
      } else {
        actualizarDerivacion = {
          id: _existeDenuncia.id,
          idSlimReasignacion: idParametro
        }
      }

      await DenunciaRepository.createOrUpdate(actualizarDerivacion);

      const respuesta = await _generatePDF(html, '216mm', '279mm', {
        height   : '10mm',
        contents : {
          default:
            `<div id="pageFooter" style="text-align: center; font-size: 12px;">
              <p>Generado por: ${_existeUsuario.nombres} ${_existeUsuario.primerApellido} ${_existeUsuario.segundoApellido} en fecha: ${moment().format('DD-MM-YYYY')}</p>
              <p>{{page}}/{{pages}}</p>
            </div>`
        }
      });
      return respuesta.toString('base64');
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function generarReporteAvanzado (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteAvanzadoDelitos(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function getFiltrosReporte (datos) {
    try {
      const idProceso = datos.idTipoProceso;

      const { rows: tiposParticipante } = await ParametroRepository.findAll({ grupo: 'TIPO_PARTICIPANTE', idProceso });
      const { rows: tiposParticipanteSlim } = await ParametroRepository.findAll({ grupo: 'TIPO_PARTICIPANTE_SLIM', idProceso });
      const { rows: tiposConclusion } = await ParametroRepository.findAll({ grupo: 'TIPO_CONCLUSION', grupo: 'TIPO_CONCLUSION_SLIM', idProceso });
      const { rows: subconclusiones } = await ParametroRepository.findAll({ grupo: 'TIPO_CONCLUSION_HIJO', idProceso });
      const { rows: genero } = await ParametroRepository.findAll({ grupo: 'GENERO', idProceso }); //DEFENSORIAS
      const { rows: etapaProcesal } = await ParametroRepository.findAll({ grupo: 'ETAPA_PROCESAL_GAMEA', idProceso });
      const { rows: tipologiaDefensoria } = await ParametroRepository.findAll({ grupo: 'TIPOLOGIA_DEFENSORIA_GAMEA', idProceso });
      const { rows: tipologiaSlims } = await ParametroRepository.findAll({ grupo: 'TIPOLOGIA_SLIM_GAMEA', idProceso });
      // const { rows: ciudad } = await ParametroRepository.findAll({ grupo: 'CIUDAD_GAMEA', idProceso });
      const { rows: zona } = await ParametroRepository.findAll({ grupo: 'ZONA_GAMEA', grupo: 'ZONA_GAMEA_SLIM', idProceso });
      const { rows: defensoria } = await ParametroRepository.findAll({ grupo: 'DEFENSORIA', idProceso });
      const { rows: slim } = await ParametroRepository.findAll({ grupo: 'SLIM', idProceso });
      const { rows: tipoDocumentoSlim } = await ParametroRepository.findAll({ grupo: 'DOCUMENTO_SLIM_GAMEA', idProceso });
      const { rows: tipoDocumento } = await ParametroRepository.findAll({ grupo: 'TIPO_DOCUMENTO', idProceso });

      const {IDPROCESODEFENSORIA, IDPROCESOSLIM} = TIPOPROCESO;

      let filtros = [];

      if (IDPROCESODEFENSORIA == idProceso) {
        
        const { rows: usuarios } = await UsuarioRepository.findAll({idProceso, defensorias: datos.defensorias});
        filtros = [
          {
            titulo  : 'Campos de la denuncia',
            filtros : [
              { label: 'Fecha de la denuncia - desde', value: 'fechaDenunciaInicio', type: 'date' },
              { label: 'Fecha de la denuncia - hasta', value: 'fechaDenunciaFin', type: 'date' },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Zona o Urbanización',
                value : 'idZona',
                type     : 'select',
                multiple : true,
                options  : zona.map(x => ({ label: x.nombre, value: x.id }))
              },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Código Denuncia Fiscalía',
                value : 'codigoDenuncia',
                type  : 'input'
              },
              { label: 'Fecha de ingreso - desde', value: 'fechaIngresoGameaInicio', type: 'date' },
              { label: 'Fecha de ingreso - hasta', value: 'fechaIngresoGameaFin', type: 'date' },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Denominacion del caso',
                value : 'denominacion',
                type  : 'input'
              },
              /* {
                label    : 'Estado de la denuncia',
                value    : 'estadoActual',
                multiple : true,
                type     : 'select',
                options  : [
                  { label: 'ASIGNADO', value: 'ASIGNADO' },
                  { label: 'REASIGNADO', value: 'REASIGNADO' },
                  { label: 'CERRADO', value: 'CERRADO' },
                  { label: 'SEGUIMIENTO', value: 'SEGUIMIENTO' }
                ]
              }, */
              { label: 'NUREJ/Codigo unico', value: 'nurej', type: 'input' },
              { label: 'Fiscal asignado', value: 'fiscal', type: 'input' },
              { label: 'Juzgado', value: 'juzgado', type: 'input' },
              { label: 'Nombre del juez', value: 'nombreJuez', type: 'input' },
              { label: 'Investigador asignado al caso', value: 'policia', type: 'input' },
              { label: 'Relación Sucinta del Hecho', value: 'relacionHecho', type: 'input' },
              { label: 'Tipo de conclusion', value: 'idTipoConclusion', type: 'select', multiple: true, options: tiposConclusion.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Registro en sistema - desde', value: 'fechaRegistroInicio', type: 'date' },
              { label: 'Registro en sistema - hasta', value: 'fechaRegistroFin', type: 'date' },
              { label: 'Cite GAMEA', value: 'correlativoGamea', type: 'input' },
              //{ label: 'Nombre de la víctima', value: 'nombreVictima', type: 'input' },
              //{ label: 'Documento de la víctima', value: 'documentoVictima', type: 'input' },
              //{ label: 'Nombre del denunciante', value: 'nombreDenunciante', type: 'input' },
              //{ label: 'Documento del denunciante', value: 'documentoDenunciante', type: 'input' },
              //{ label: 'Nombre del denunciado', value: 'nombreDenunciado', type: 'input' },
              //{ label: 'Documento del denunciado', value: 'documentoDenunciado', type: 'input' },
              {
                label    : 'Tipología DEFENSORIAS',
                value    : 'idDelito',
                type     : 'select',
                multiple : true,
                options  : tipologiaDefensoria.map(x => ({ label: x.nombre, value: x.id })),
                filter   : {
                  url   : `system/parametros?grupo=TIPOLOGIA_DEFENSORIA_GAMEA&idProceso=${idProceso}`,
                  label : ['nombre'],
                  value : 'id',
                  query : 'nombre'
                }
              },
              {
                class    : 'col-xs-12 col-sm-6 col-md-2',
                label    : 'Defensoría',
                value    : 'idDefensoria',
                type     : 'select',
                options  : defensoria.map(x => ({ label: x.nombre, value: x.id }))
              },
              {
                class    : 'col-xs-12 col-sm-6 col-md-2',
                label    : 'Sexo',
                value    : 'idGenero',
                type     : 'select',
                options  : genero.map(x => ({ label: x.nombre, value: x.id }))
              },
              {
                label    : 'Usuario asignado',
                value    : 'idUsuarioAsignado',
                multiple : true,
                type     : 'select',
                options  : usuarios.map(x => ({ label: `${x.nombres} ${x.primerApellido} ${x.segundoApellido}`, value: x.id })),
                filter   : {
                  url   : 'system/usuarios',
                  label : ['nombres', 'primerApellido', 'segundoApellido'],
                  value : 'id',
                  query : 'nombreCompleto'
                }
              }
            ],
          },
          {
            titulo  : 'Campos de los participantes',
            filtros : [
              { label: 'Tipo de participante', value: 'idTipoParticipante', type: 'select', multiple: true, options: tiposParticipante.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Tipo de documento', value: 'idTipoDocumento', type: 'select', multiple: true, options: tipoDocumento.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Numero documento partes (ci, Run...)', value: 'numeroDocumento', type: 'input' },
              { label: 'Nombre completo', value: 'nombreCompleto', type: 'input' },
              { label: 'Búsqueda por Edad', value: 'edad', type: 'input' },
              { label: 'Búsqueda por Edad en Meses', value: 'edadMeses', type: 'input' },
              //----------------editado hasta aqui
            ]
          }
          /* {
            titulo  : 'Campos de los participantes',
            filtros : [
              { label: 'Tipo de participante', value: 'idTipoParticipante', type: 'select', multiple: true, options: tiposParticipante.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Tipo de documento', value: 'idTipoDocumento', type: 'select', multiple: true, options: tiposDocumento.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Numero documento partes (ci, pasaporte...)', value: 'numeroDocumento', type: 'input' },
              { label: 'Nombre completo', value: 'nombreCompleto', type: 'input' },
              { label: 'Género', value: 'idGenero', type: 'select', options: genero.map(x => ({ label: x.nombre, value: x.id })) },
              { label: '¿Pertenece a la comunidad LGBTI+ ?', value: 'idComunidad', type: 'select', options: perteneceLgbti.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Edad al momento del hecho', value: 'edadHecho', type: 'input' },
              { label: 'Etapa Procesal', value: 'idEtapaProcesalSepdavi', type: 'select', multiple: true, options: etapaProcesal.map(x => ({ label: x.nombre, value: x.id })) },
              //----------------editado hasta aqui
            ]
          } */
          /* {
            titulo  : 'Campos de los bienes cautelados',
            filtros : [
              {
                label    : 'Tipo de bien',
                value    : 'idTipoBien',
                type     : 'select',
                multiple : true,
                options  : tiposBien.map(x => ({ label: x.nombre, value: x.id })),
                filter   : {
                  url   : `system/parametros?grupo=TIPO_BIEN&idProceso=${idProceso}`,
                  label : ['nombre'],
                  value : 'id',
                  query : 'nombre'
                }
              },
              { label: 'Descripcion', value: 'descripcion', type: 'input' }
            ]
          },
          {
            titulo  : 'Campos de los delitos precedentes',
            filtros : [
              { label: 'Categoria delito precedente', value: 'idCategoriaDelito', type: 'select', multiple: true, options: categoriasDelitoPrecedente.map(x => ({ label: x.nombre, value: x.id })) },
              {
                label    : 'Delito precedente',
                value    : 'idDelitoPrecedente',
                type     : 'select',
                multiple : true,
                options  : tipoDelitoPrecedente.map(x => ({ label: x.nombre, value: x.id })),
                filter   : {
                  url   : 'system/parametros?grupo=DELITO_PRECEDENTE',
                  label : ['nombre'],
                  value : 'id',
                  query : 'nombre'
                }
              },
              { label: 'Observaciones', value: 'observacion', type: 'input' }
            ]
          } */
        ];
      } else if (IDPROCESOSLIM == idProceso) {
        const { rows: usuarios } = await UsuarioRepository.findAll({idProceso, slims: datos.slims});
        
        filtros = [
          {
            titulo  : 'Campos de la denuncia',
            filtros : [
              { label: 'Fecha de la denuncia - desde', value: 'fechaDenunciaInicio', type: 'date' },
              { label: 'Fecha de la denuncia - hasta', value: 'fechaDenunciaFin', type: 'date' },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Zona o Urbanización',
                value : 'idZona',
                type     : 'select',
                multiple : true,
                options  : zona.map(x => ({ label: x.nombre, value: x.id }))
              },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Código Denuncia Fiscalía',
                value : 'codigoDenuncia',
                type  : 'input'
              },
              { label: 'Fecha de ingreso - desde', value: 'fechaIngresoGameaInicio', type: 'date' },
              { label: 'Fecha de ingreso - hasta', value: 'fechaIngresoGameaFin', type: 'date' },
              {
                class : 'col-xs-12 col-sm-6 col-md-2',
                label : 'Denominacion del caso',
                value : 'denominacion',
                type  : 'input'
              },
              /* {
                label    : 'Estado de la denuncia',
                value    : 'estadoActual',
                multiple : true,
                type     : 'select',
                options  : [
                  { label: 'ASIGNADO', value: 'ASIGNADO' },
                  { label: 'REASIGNADO', value: 'REASIGNADO' },
                  { label: 'CERRADO', value: 'CERRADO' },
                  { label: 'SEGUIMIENTO', value: 'SEGUIMIENTO' }
                ]
              }, */
              { label: 'NUREJ/Codigo unico', value: 'nurej', type: 'input' },
              { label: 'Fiscal asignado', value: 'fiscal', type: 'input' },
              { label: 'Juzgado', value: 'juzgado', type: 'input' },
              { label: 'Nombre del juez', value: 'nombreJuez', type: 'input' },
              { label: 'Investigador asignado al caso', value: 'policia', type: 'input' },
              { label: 'Relación Sucinta del Hecho', value: 'relacionHecho', type: 'input' },
              { label: 'Tipo de conclusion', value: 'idTipoConclusion', type: 'select', multiple: true, options: tiposConclusion.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Registro en sistema - desde', value: 'fechaRegistroInicio', type: 'date' },
              { label: 'Registro en sistema - hasta', value: 'fechaRegistroFin', type: 'date' },
              { label: 'Cite GAMEA', value: 'correlativoGamea', type: 'input' },
              //{ label: 'Nombre de la víctima', value: 'nombreVictima', type: 'input' },
              //{ label: 'Documento de la víctima', value: 'documentoVictima', type: 'input' },
              //{ label: 'Nombre del denunciante', value: 'nombreDenunciante', type: 'input' },
              //{ label: 'Documento del denunciante', value: 'documentoDenunciante', type: 'input' },
              //{ label: 'Nombre del denunciado', value: 'nombreDenunciado', type: 'input' },
              //{ label: 'Documento del denunciado', value: 'documentoDenunciado', type: 'input' },
              {
                label    : 'Tipología SLIMS',
                value    : 'idDelito',
                type     : 'select',
                multiple : true,
                options  : tipologiaSlims.map(x => ({ label: x.nombre, value: x.id })),
                filter   : {
                  url   : `system/parametros?grupo=TIPOLOGIA_SLIM_GAMEA&idProceso=${idProceso}`,
                  label : ['nombre'],
                  value : 'id',
                  query : 'nombre'
                }
              },
              {
                class    : 'col-xs-12 col-sm-6 col-md-2',
                label    : 'SLIM',
                value    : 'idSlim',
                type     : 'select',
                options  : slim.map(x => ({ label: x.nombre, value: x.id }))
              },
              {
                label    : 'Usuario asignado',
                value    : 'idUsuarioAsignado',
                multiple : true,
                type     : 'select',
                options  : usuarios.map(x => ({ label: `${x.nombres} ${x.primerApellido} ${x.segundoApellido}`, value: x.id })),
                filter   : {
                  url   : 'system/usuarios',
                  label : ['nombres', 'primerApellido', 'segundoApellido'],
                  value : 'id',
                  query : 'nombreCompleto'
                }
              }
            ]
          },
          {
            titulo  : 'Campos de los participantes',
            filtros : [
              { label: 'Tipo de participante', value: 'idTipoParticipante', type: 'select', multiple: true, options: tiposParticipanteSlim.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Tipo de documento', value: 'idTipoDocumento', type: 'select', multiple: true, options: tipoDocumentoSlim.map(x => ({ label: x.nombre, value: x.id })) },
              { label: 'Numero documento partes (ci, Run...)', value: 'numeroDocumento', type: 'input' },
              { label: 'Nombre completo', value: 'nombreCompleto', type: 'input' },
              { label: 'Búsqueda por Edad', value: 'edad', type: 'input' },
              { label: 'Búsqueda por Edad en Meses', value: 'edadMeses', type: 'input' },
            ]
          }
        ];
      }

      return filtros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function filtradoAvanzado (params) {
    try {
      const comentarios = await DenunciaRepository.filtradoAvanzado(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function formatearJson (rows) {
    try {
      for (const row of rows) {
        console.log('==============MENSAJE=================')
        console.log(row)
        console.log('==============MENSAJE=================')
      }
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteBienesCautelados (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteBienesCautelados(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reportePenasImpuestas (datos) {
    try {
      const anios = [
        { label: '1 - 3 años', minimo: 1, maximo: 3 },
        { label: '4 - 5 años', minimo: 4, maximo: 5 },
        { label: '6 - 7 años', minimo: 6, maximo: 7 },
        { label: '8 - 10 años', minimo: 8, maximo: 10 }
      ];

      const dias = [
        { label: '100 - 200 dias', minimo: 100, maximo: 200 },
        { label: '201 - 300 dias', minimo: 201, maximo: 300 },
        { label: '301 - 500 dias', minimo: 301, maximo: 500 }
      ];

      const reporteAvanzado = await DenunciaRepository.reportePenasImpuestas(anios, dias, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteSoloDelitosPrecedentes (datos) {
    try {
      const variantes = [
        { label: 'NARCOTRAFICO', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'CORRUPCIÓN', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'CONTRABANDO', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'TRATA DE PERSONAS', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'OTROS', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteSoloDelitosPrecedentes(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteSentenciasLGI (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteSentenciasLGI(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteBienesDecomisados (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteBienesDecomisados(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteBienesConfiscados (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteBienesConfiscados(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function reporteBienesIncautados (datos) {
    try {
      const variantes = [
        { label: 'LGI', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657' },
        { label: 'FT', idDelito: '92016e05-98dd-402b-9f15-6e6c12290069' },
        { label: 'LGI + NARCOTRAFICO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: 'c8ac29be-bffb-48e3-a3b6-e65504887f52' },
        { label: 'LGI + CORRUPCIÓN', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '60e1e363-e566-4b4d-9a6e-f12f8a1906fc' },
        { label: 'LGI + CONTRABANDO', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '89bcdabc-a7eb-4c7d-a281-179186742b87' },
        { label: 'LGI + TRATA DE PERSONAS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '66ab53d5-2ec3-42ef-a431-47d2c6e95bdc' },
        { label: 'LGI + OTROS', idDelito: '482e5b57-65e2-4fa0-bf2c-f91c03383657', idCategoriaDelitoPrecedente: '7fd82b3a-51e3-48bd-b1e4-b38e98a50e98' }
      ];
      const reporteAvanzado = await DenunciaRepository.reporteBienesIncautados(variantes, datos);
      return reporteAvanzado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function concluirDenuncia (datos) {
    try {
      const respuesta = await DenunciaRepository.createOrUpdate(datos);
      return respuesta;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function seguimientoSaj (codigoSaj) {
    try {
      if(!codigoSaj)throw new Error('Envie un código saj por favor.');
      const respuesta = await DenunciaRepository.findAll({codigoSaj});
      if(!respuesta.rows.length > 0)throw new Error('No se encontró una denuncia con el código SAJ proporcionado');
      const data = respuesta.rows.pop();
      const {nombres, primerApellido, segundoApellido, numeroDocumento, complemento} = data.usuarioAsignado;
      const resp = {
        estado: data.estadoActual,
        etapa: data.etapaActual,
        usuario: {
          nombreCompleto: `${nombres} ${primerApellido} ${segundoApellido}`,
          numeroDocumento: complemento?`${numeroDocumento}-${complemento}`:`${numeroDocumento}`
        },
        codigoSaj: data.codigoSaj,
        codigoFiscalia: data.codigoDenuncia,
        /* nombreEntidad: 'SERVICIO PLURINACIONAL DE ASISTENCIA A LA VÍCTIMA (SEPDAVI)',
        direccion: 'Av. Mariscal Santa Cruz Esquina Calle Colombia, Edif. Cámara Nacional de Comercio Nº 1392, Piso 7',
        servicio: 'Servicio de Asistencia a la Víctima', */
      };
      return resp;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function datosSaj (codigoSaj) {
    try {
      const { data } = await axios({
        url: `${DATOS_SAJ.URL_SAJ}casos/${codigoSaj}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${DATOS_SAJ.TOKEN_SAJ}` }
      });
      console.log('==============DATOS_SAJ=================')
      console.log(data)
      console.log('==============DATOS_SAJ=================')
      return data;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function actualizarSaj (data, codigoSaj) {
    try {
      const { data: respuestaPatch } = await axios({
        url: `${DATOS_SAJ.URL_SAJ}casos/${codigoSaj}/estado`,
        method: 'PATCH',
        headers: { Authorization: `Bearer ${DATOS_SAJ.TOKEN_SAJ}` },
        data
      })

      console.log('==============RESPUESTA_SAJ=================');
      console.log(respuestaPatch);
      console.log('==============RESPUESTA_SAJ=================');

      return data;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function sucursalesSaj () {
    try {
      const { data: sucursales } = await axios({
        url: `${DATOS_SAJ.URL_SAJ}mis-sucursales`,
        method: 'GET',
        headers: { Authorization: `Bearer ${DATOS_SAJ.TOKEN_SAJ}` }
      })

      return sucursales.datos.rows;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function contarDenuncias (idProceso) {
    try {
      const respuesta = await DenunciaRepository.findCount(idProceso);
      return respuesta;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    sucursalesSaj,
    actualizarSaj,
    datosSaj,
    reporteBienesConfiscados,
    reporteBienesIncautados,
    concluirDenuncia,
    reporteBienesDecomisados,
    reporteSentenciasLGI,
    reporteSoloDelitosPrecedentes,
    reportePenasImpuestas,
    reporteBienesCautelados,
    filtradoAvanzado,
    getFiltrosReporte,
    generarReporteAvanzado,
    reporteDenuncia,
    cerrarDenuncia,
    reasignarDenuncia,
    reportesDenuncia,
    findById,
    findOne,
    listar,
    createOrUpdate,
    deleteItem,
    formatearJson,
    seguimientoSaj,
    habilitarTrabajoSocial,
    contarDenuncias
  };
};
