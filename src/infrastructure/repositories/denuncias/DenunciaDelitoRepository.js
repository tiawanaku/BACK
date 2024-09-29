'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaDelitoRepository (models, Sequelize) {
  const { denunciaDelito } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaDelito.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaDelito),
    findById       : (id) => Repository.findById(id, denunciaDelito),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaDelito, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaDelito, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaDelito, t)
  };
};
