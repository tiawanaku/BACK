'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaCheckPreparatoriaRepository (models, Sequelize) {
  const { denunciaCheckPreparatoria } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaCheckPreparatoria.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaCheckPreparatoria),
    findById       : (id) => Repository.findById(id, denunciaCheckPreparatoria),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaCheckPreparatoria, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaCheckPreparatoria, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaCheckPreparatoria, t)
  };
};
