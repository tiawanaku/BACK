'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function rolProcesoRepository (models, Sequelize) {
  const { RolProceso } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return RolProceso.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, RolProceso),
    findById       : (id) => Repository.findById(id, RolProceso),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, RolProceso, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, RolProceso, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, RolProceso, t)
  };
};
