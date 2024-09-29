'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function historialService (repositories, helpers, res) {
  const { transaction, HistorialRepository } = repositories;

  async function findAll (params) {
    try {
      const historiales = await HistorialRepository.findAll(params);
      return historiales;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const historial = await HistorialRepository.findOne(params);
      return historial;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar Historial');
    let historial;
    let transaccion;
    try {
      transaccion = await transaction.create();
      historial = await HistorialRepository.createOrUpdate(data, transaccion);
      await transaction.commit(transaccion);

      return historial;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findOne,
    findAll,
    createOrUpdate
  };
};
