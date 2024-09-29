'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function participanteService (repositories, helpers, res) {
  const { ParticipanteRepository, DenunciadoRepository, transaction } = repositories;

  async function listar (params) {
    try {
      const comentarios = await ParticipanteRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function listarAtributos (params) {
    try {
      const comentarios = await ParticipanteRepository.findAllAtributos(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const participante = await ParticipanteRepository.findOne(params);
      if (!participante) {
        throw new Error('El participante no existe');
      }
      return participante;
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
      denuncia = await ParticipanteRepository.createOrUpdate(data, transaccion);
      if (data.denunciados) {
        for (const denunciado of data.denunciados) {
          denunciado.idDenuncia = denuncia.id;
          await DenunciadoRepository.createOrUpdate(denunciado, transaccion);
        }
      }

      if (data.victimas) {
        for (const victima of data.victimas) {
          victima.idDenuncia = denuncia.id;
          await ParticipanteRepository.createOrUpdate(victima, transaccion);
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
    try {
      const resultado = await ParticipanteRepository.deleteItemcond(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findOne,
    listar,
    listarAtributos,
    createOrUpdate,
    deleteItem
  };
};
