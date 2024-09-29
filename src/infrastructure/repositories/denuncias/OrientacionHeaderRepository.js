'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function OrientacionHeaderRepository (models, Sequelize) {
  const { orientacionHeader } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.tipo) {
      query.where.tipo = params.tipo;
    }

    return orientacionHeader.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, orientacionHeader),
    findById       : (id) => Repository.findById(id, orientacionHeader),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, orientacionHeader, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, orientacionHeader, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, orientacionHeader, t)
  };
};
