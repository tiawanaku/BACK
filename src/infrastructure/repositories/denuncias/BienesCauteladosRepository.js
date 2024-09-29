'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function bienesCauteladosRepository (models, Sequelize) {
  const { bienesCautelados } = models;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return bienesCautelados.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, bienesCautelados),
    findById       : (id) => Repository.findById(id, bienesCautelados),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, bienesCautelados, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, bienesCautelados, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, bienesCautelados, t)
  };
};
