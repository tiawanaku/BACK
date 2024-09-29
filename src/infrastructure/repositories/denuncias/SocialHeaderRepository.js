'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function socialHeaderRepository (models, Sequelize) {
  const { socialHeader } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.tipo) {
      query.where.tipo = params.tipo;
    }

    return socialHeader.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, socialHeader),
    findById       : (id) => Repository.findById(id, socialHeader),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, socialHeader, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, socialHeader, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, socialHeader, t)
  };
};
