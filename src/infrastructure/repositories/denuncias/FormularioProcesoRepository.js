'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function formularioProcesoRepository (models, Sequelize) {
  const { FormularioProceso } = models;
  const Op = Sequelize.Op;
  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return FormularioProceso.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, FormularioProceso),
    findById       : (id) => Repository.findById(id, FormularioProceso),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, FormularioProceso, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, FormularioProceso, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, FormularioProceso, t)
  };
};
