'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON} = require('../../lib/util');

module.exports = function denunciaServicioBasicoRepository (models, Sequelize) {
  const { denunciaServicioBasico } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if(params.idDenuncia){
      query.where.idDenuncia = params.idDenuncia;
    }
    const resultado = await denunciaServicioBasico.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaServicioBasico),
    findById       : (id) => Repository.findById(id, denunciaServicioBasico),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaServicioBasico, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaServicioBasico, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaServicioBasico, t)
  };
};
