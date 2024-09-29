'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function denunciaEntidadRepository (models, Sequelize) {
  const { denunciaEntidad } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return denunciaEntidad.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaEntidad),
    findById       : (id) => Repository.findById(id, denunciaEntidad),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaEntidad, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaEntidad, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaEntidad, t)
  };
};
