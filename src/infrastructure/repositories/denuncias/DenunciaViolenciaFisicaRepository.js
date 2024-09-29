'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaViolenciaFisicaRepository (models, Sequelize) {
  const { denunciaViolenciaFisica } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaViolenciaFisica.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaViolenciaFisica),
    findById       : (id) => Repository.findById(id, denunciaViolenciaFisica),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaViolenciaFisica, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaViolenciaFisica, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaViolenciaFisica, t)
  };
};
