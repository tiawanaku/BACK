'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaViolenciaPsicologicaRepository (models, Sequelize) {
  const { denunciaViolenciaPsicologica } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaViolenciaPsicologica.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaViolenciaPsicologica),
    findById       : (id) => Repository.findById(id, denunciaViolenciaPsicologica),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaViolenciaPsicologica, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaViolenciaPsicologica, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaViolenciaPsicologica, t)
  };
};
