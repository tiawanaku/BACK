'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function llenadoService (repositories, helpers, res) {
  const { transaction, DenunciaLlenadoRolRepository } = repositories;

  async function findAll (params) {
    try {
      const llenados = await DenunciaLlenadoRolRepository.findAll(params);
      return llenados;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findAll,
  };
};
