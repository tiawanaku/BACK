'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaCheckPreliminarRepository (models, Sequelize) {
  const { denunciaCheckPreliminar } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    const resultado = await denunciaCheckPreliminar.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaCheckPreliminar),
    findById       : (id) => Repository.findById(id, denunciaCheckPreliminar),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaCheckPreliminar, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaCheckPreliminar, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaCheckPreliminar, t)
  };
};
