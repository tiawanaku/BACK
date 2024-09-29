'use strict';

const Repository = require('../Repository');
const { getQuery, toJSON} = require('../../lib/util');

module.exports = function denunciaTipoViviendaRepository (models, Sequelize) {
  const { denunciaTipoVivienda } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if(params.idDenuncia){
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaTipoVivienda.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaTipoVivienda),
    findById       : (id) => Repository.findById(id, denunciaTipoVivienda),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaTipoVivienda, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaTipoVivienda, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaTipoVivienda, t)
  };
};
