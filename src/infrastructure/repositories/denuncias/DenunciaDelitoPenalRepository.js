'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaDelitoPenalRepository (models, Sequelize) {
  const { denunciaDelitoPenal } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaDelitoPenal.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaDelitoPenal),
    findById       : (id) => Repository.findById(id, denunciaDelitoPenal),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaDelitoPenal, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaDelitoPenal, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaDelitoPenal, t)
  };
};
