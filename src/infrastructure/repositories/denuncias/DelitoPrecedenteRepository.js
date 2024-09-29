'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function DelitoPrecedenteRepository (models, Sequelize) {
  const { DelitoPrecedente } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return DelitoPrecedente.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, DelitoPrecedente),
    findById       : (id) => Repository.findById(id, DelitoPrecedente),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, DelitoPrecedente, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, DelitoPrecedente, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, DelitoPrecedente, t)
  };
};
