'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function entidadService (repositories, helpers, res) {
  const { ArchivoRepository, DenunciadoRepository, VictimaRepository, SeguimientoRepository, HistorialRepository, transaction } = repositories;

  async function listar (params) {
    try {
      const comentarios = await ArchivoRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const archivo = await ArchivoRepository.findOne(params);
      if (!archivo) {
        throw new Error('El archivo no existe');
      }
      return archivo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar Entidad');
    let denuncia;
    let transaccion;
    try {
      transaccion = await transaction.create();
      denuncia = await ArchivoRepository.createOrUpdate(data, transaccion);
      if (data.denunciados) {
        for (const denunciado of data.denunciados) {
          denunciado.idDenuncia = denuncia.id;
          await DenunciadoRepository.createOrUpdate(denunciado, transaccion);
        }
      }

      if (data.victimas) {
        for (const victima of data.victimas) {
          victima.idDenuncia = denuncia.id;
          await VictimaRepository.createOrUpdate(victima, transaccion);
        }
      }
      await transaction.commit(transaccion);

      return denuncia;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    debug('Eliminando entidad', params);
    let transaccion;
    try {
      transaccion = await transaction.create();

      const archivo = await ArchivoRepository.findById(params.id, transaccion);

      const seguimiento = await SeguimientoRepository.findById(archivo.idSeguimiento, transaccion);

      const historial = {
        idDenuncia: seguimiento.idDenuncia,
        campo: `Se eliminó un archivo de ${seguimiento.etapaDenuncia}`,
        valor: `${archivo.archivo} - ${archivo.descripcion}`,
        userCreated: params.userDeleted
      }

      await HistorialRepository.createOrUpdate(historial, transaccion);

      const resultado = await ArchivoRepository.deleteItemCond(params, transaccion);

      await transaction.commit(transaccion);

      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findOne,
    listar,
    createOrUpdate,
    deleteItem
  };
};
