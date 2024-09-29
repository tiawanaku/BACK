'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function correlativoGameaRepository (models, Sequelize) {
  const { correlativoGamea } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const resultado = await correlativoGamea.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, correlativoGamea),
    findById       : (id) => Repository.findById(id, correlativoGamea),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, correlativoGamea, t),
    // deleteItem     : (id, t) => Repository.deleteItem(id, denunciaLlenadoRol, t),
    // deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaLlenadoRol, t)
  };
};
