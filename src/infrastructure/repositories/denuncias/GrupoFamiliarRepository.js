'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function grupoFamiliarRepository (models, Sequelize) {
  const { grupoFamiliar, parametro } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    /* query.include = [
      {
        model : parametro,
        as    : 'parentesco'
      },
      {
        model : parametro,
        as    : 'grupoEstadoCivil'
      }
    ]; */
    const resultado = await grupoFamiliar.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, grupoFamiliar),
    findById       : (id) => Repository.findById(id, grupoFamiliar),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, grupoFamiliar, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, grupoFamiliar, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, grupoFamiliar, t)
  };
};
