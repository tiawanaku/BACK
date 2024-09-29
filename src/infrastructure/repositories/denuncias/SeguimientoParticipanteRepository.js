'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function seguimientoParticipanteRepository (models, Sequelize) {
  const { seguimientoParticipante } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idSeguimiento) {
      query.where.idSeguimiento = params.idSeguimiento;
    }

    const resultado = await seguimientoParticipante.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, seguimientoParticipante),
    findById       : (id) => Repository.findById(id, seguimientoParticipante),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, seguimientoParticipante, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, seguimientoParticipante, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, seguimientoParticipante, t)
  };
};
