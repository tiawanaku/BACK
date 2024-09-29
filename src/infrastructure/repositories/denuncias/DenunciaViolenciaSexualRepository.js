'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaViolenciaSexualRepository (models, Sequelize) {
  const { denunciaViolenciaSexual } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaViolenciaSexual.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaViolenciaSexual),
    findById       : (id) => Repository.findById(id, denunciaViolenciaSexual),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaViolenciaSexual, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaViolenciaSexual, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaViolenciaSexual, t)
  };
};
