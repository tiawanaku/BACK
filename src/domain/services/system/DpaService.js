'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');
module.exports = function parametroService (repositories, helpers, res) {
  const { DpaRepository } = repositories;

  async function findAll (params) {
    try {
      const parametros = await DpaRepository.findAll(params);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const parametros = await DpaRepository.createOrUpdate(datos);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function eliminar (params) {
    try {
      const parametros = await DpaRepository.deleteItemCond(params);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    eliminar,
    createOrUpdate,
    findAll
  };
};
