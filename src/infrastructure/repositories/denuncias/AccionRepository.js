'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function accionRepository (models, Sequelize) {
  const { acciones } = models;
  const Op = Sequelize.Op;
  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return acciones.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, acciones),
    findById       : (id) => Repository.findById(id, acciones),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, acciones, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, acciones, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, acciones, t)
  };
};
