'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');
const fs = require('fs');
const { ROLES_ID } = require('../../../common/config/constants');

module.exports = function seguimientoService (repositories, helpers, res) {
  const { UsuarioRepository, SeguimientoRepository, ArchivoRepository,
    transaction, DenunciaRepository, HistorialRepository, DenunciaLlenadoRolRepository,
    RolRepository, SeguimientoParticipanteRepository,
    DenunciaCkeckPreliminarRepository, DenunciaCheckPreparatoriaRepository
  } = repositories;

  async function listar (params) {
    try {
      const comentarios = await SeguimientoRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const seguimiento = await SeguimientoRepository.findOne(params);
      if (!seguimiento) {
        throw new Error('El seguimiento no existe');
      }
      return seguimiento;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function registrarSeguimiento ({ idDenuncia, estadoActual, etapaActual, idUsuario, idUsuarioAsignado, fechaActuacion, actuacion }, transaccion) {
    const _existeDenuncia = await DenunciaRepository.findByUUID(idDenuncia, transaccion);
    if (!_existeDenuncia) {
      throw new Error('La denuncia no existe');
    }

    const _existeEstado = _existeDenuncia.proceso.configuracion.find(x => x.nombre === estadoActual);
    if (!_existeEstado) {
      throw new Error('No existe el estado registrado en el proceso.');
    }

    let _existeEtapa = {};
    if (etapaActual) {
      _existeEtapa = _existeEstado.etapas.find(x => x.nombre === etapaActual);
      if (!_existeEtapa) {
        throw new Error('No existe la etapa registrada en el estado.');
      }
    }

    const _existeUsuario = await UsuarioRepository.findOne({ id: idUsuario }, transaccion);
    if (!_existeUsuario) {
      throw new Error('No existe el usuario solicitado');
    }

    if (idUsuarioAsignado) {
      const _existeUsuarioAsignacion = await UsuarioRepository.findOne({ id: idUsuarioAsignado }, transaccion);
      if (!_existeUsuarioAsignacion) {
        throw new Error('No existe el usuario solicitado');
      }
    }

    await DenunciaRepository.createOrUpdate({
      id           : _existeDenuncia.id,
      estadoActual : _existeEstado.nombre,
      etapaActual  : _existeEtapa.nombre
    }, transaccion);

    if (!actuacion) {
      actuacion = _existeEstado.descripcion;
    }

    const seguimientoCrear = {
      idDenuncia     : _existeDenuncia.id,
      estadoDenuncia : _existeEstado.nombre,
      etapaDenuncia  : _existeEtapa.nombre,
      fechaActuacion,
      actuacion,
      userCreated    : idUsuario
    };

    await SeguimientoRepository.createOrUpdate(seguimientoCrear, transaccion);

    return transaccion;
  }

  async function createOrUpdate (data, t, actualizarDenuncia = true) {
    debug('Crear o actualizar Entidad');
    let seguimiento;
    const transaccion = t || await transaction.create();
    try {
      
      const idDenuncia = data.id || data.idDenuncia;

      const _existeDenuncia = await DenunciaRepository.findOne({ id: idDenuncia }, transaccion);

      if (!_existeDenuncia) {
        throw new Error('La denuncia a la que quiere hacerle seguimiento, no existe');
      }
      const carpetaProceso = `${config.app.archivosPrivados}/${_existeDenuncia.idTipoProceso}`;

      if (!fs.existsSync(carpetaProceso)) {
        fs.mkdirSync(carpetaProceso);
      }

      const carpetaDenuncia = `${carpetaProceso}/${_existeDenuncia.id}`;
      if (!fs.existsSync(carpetaDenuncia)) {
        fs.mkdirSync(carpetaDenuncia);
      }

      if (_existeDenuncia.estadoActual === 'CERRADO') {
        throw new Error('La denuncia fue cerrada, no puede continuar con el seguimiento.');
      }

      // const {ETAPA_ORIENTACION, ETAPA_PSICOLOGIA, ETAPA_SOCIAL, ETAPA_PATROCINIO} = ETAPASEGUIMIENTO;
      const {VENTANILLA, ABOGADO, PSICOLOGIA, SOCIAL} = ROLES_ID;
      const rol = await RolRepository.findById(data.rolActual);

      let nombreEtapaRol = rol.id == PSICOLOGIA ? 'PSICOLOGIA' : rol.id == SOCIAL ? 'SOCIAL' : rol.id == VENTANILLA ? 'ORIENTACION' : rol.id == ABOGADO ? 'PATROCINIO' : '';

      data.nombreEtapaRol = nombreEtapaRol;

      seguimiento = await SeguimientoRepository.createOrUpdate(data, transaccion);

      if (data.participantes) {
        for (const participante of data.participantes) {
          await SeguimientoParticipanteRepository.createOrUpdate({
            idSeguimiento: seguimiento.id,
            idParticipante: participante,
            userCreated: data.userCreated || data.userUpdated,
          },transaccion);
        }
      }

      if (actualizarDenuncia) {
        await DenunciaRepository.createOrUpdate({
          id           : data.idDenuncia,
          estadoActual : data.estadoDenuncia,
          etapaActual  : data.etapaDenuncia
        }, transaccion);
      }

      let strArchivo = '';

      if (data.archivos) {
        await ArchivoRepository.deleteItemCond({
          idSeguimiento : seguimiento.id,
          userDeleted   : data.userCreated || data.userUpdated
        }, transaccion);
        for (const archivo of data.archivos) {
          const direccionArchivo = `${config.app.archivosPrivados}/${archivo.archivo}`;
          if (fs.existsSync(direccionArchivo)) {
            fs.renameSync(direccionArchivo, `${carpetaProceso}/${_existeDenuncia.id}/${archivo.archivo}`);
          }
          await ArchivoRepository.createOrUpdate({
            idSeguimiento : seguimiento.id,
            descripcion   : archivo.descripcion,
            archivo       : archivo.archivo,
            userCreated   : data.userCreated || data.userUpdated
          }, transaccion);

          strArchivo += `(${archivo.archivo} - ${archivo.descripcion}) `
        }
      }

      if (data.checksPreliminar) {
        const {rows} = await DenunciaCkeckPreliminarRepository.findAll({idDenuncia: _existeDenuncia.id});
        
        const eliminar = rows.filter( elm=> !data.checksPreliminar.includes(elm.idParametroCheckPreliminar));
        const agregar = data.checksPreliminar.filter( elm => !rows.some(elm2=> elm2.idParametroCheckPreliminar == elm));

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await DenunciaCkeckPreliminarRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await DenunciaCkeckPreliminarRepository.createOrUpdate({
            idDenuncia        : _existeDenuncia.id,
            idParametroCheckPreliminar : elm,
            isChecked: true,
            userCreated       : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      if (data.checksPreparatoria) {
        const {rows} = await DenunciaCheckPreparatoriaRepository.findAll({idDenuncia: _existeDenuncia.id});
        
        const eliminar = rows.filter( elm=> !data.checksPreparatoria.includes(elm.idParametroCheckPreparatoria));
        const agregar = data.checksPreparatoria.filter( elm => !rows.some(elm2=> elm2.idParametroCheckPreparatoria == elm));

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await DenunciaCheckPreparatoriaRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await DenunciaCheckPreparatoriaRepository.createOrUpdate({
            idDenuncia        : _existeDenuncia.id,
            idParametroCheckPreparatoria : elm,
            isChecked: true,
            userCreated       : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      const historial = {
        idDenuncia: data.idDenuncia,
        campo: `Se agregó ${data.etapaDenuncia}`,
        valor: `${data.actuacion} ${strArchivo}`,
        userCreated: data.idUsuario || data.userCreated || data.userUpdated
      }

      await HistorialRepository.createOrUpdate(historial, transaccion);

      if ((_existeDenuncia.usuarioAsignado == data.userCreated) || (_existeDenuncia.usuarioAsignado == data.userUpdated)) {
        const rol = await RolRepository.findById(data.rolActual);

        const {rows: cambiar} = await DenunciaLlenadoRolRepository.findAll({
          idUsuarioAsignado: _existeDenuncia.idUsuarioAsignado,
          estado: 'ACTIVO',
          idDenuncia: _existeDenuncia.id
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
          idDenuncia: _existeDenuncia.id,
          nombreRol: rol.nombre,
          idUsuarioAsignado: _existeDenuncia.idUsuarioAsignado,
          estado: 'ACTIVO',
          userCreated: data.userCreated || data.userUpdated,
          trabajo: `Se agregó ${data.etapaDenuncia} - ${data.actuacion} ${strArchivo}`
        };
        await DenunciaLlenadoRolRepository.createOrUpdate(llenadorol,transaccion);
        
      }

      if (!t) {
        await transaction.commit(transaccion);
        return seguimiento;
      }
      return t;
    } catch (err) {
      if (!t) {
        await transaction.rollback(transaccion);
      }
      throw new ErrorApp(err.message, 400);
    }
  }

  async function actualizarAtencion (data) {
    debug('Crear o actualizar Entidad');
    let seguimiento;
    const transaccion = await transaction.create();
    try {
      seguimiento = await SeguimientoRepository.createOrUpdate(data, transaccion);
      await transaction.commit(transaccion);
      return seguimiento;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    let transaccion;
    try {
      transaccion = await transaction.create();

      const data = await SeguimientoRepository.findById(params.id);

      const historial = {
        idDenuncia: data.idDenuncia,
        campo: 'Se eliminó la etapa',
        valor: `${data.etapaDenuncia}`,
        userCreated: params.userDeleted
      }

      await HistorialRepository.createOrUpdate(historial);
      
      const resultado = await SeguimientoRepository.deleteItemCond(params);

      await transaction.commit(transaccion);

      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    registrarSeguimiento,
    findOne,
    listar,
    createOrUpdate,
    deleteItem,
    actualizarAtencion
  };
};
