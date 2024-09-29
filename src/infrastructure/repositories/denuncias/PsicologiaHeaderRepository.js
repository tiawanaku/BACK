'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function psicologiaHeaderRepository (models, Sequelize) {
  const { psicologiaHeader } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.tipo) {
      query.where.tipo = params.tipo;
    }

    return psicologiaHeader.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, psicologiaHeader),
    findById       : (id) => Repository.findById(id, psicologiaHeader),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, psicologiaHeader, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, psicologiaHeader, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, psicologiaHeader, t)
  };
};
