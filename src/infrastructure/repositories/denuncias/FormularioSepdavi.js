'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function formularioRepository (models, Sequelize) {
  const { FormularioSepdavi } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);

    query.where = {};

    if(params.idRol){
        query.where.idRol = params.idRol;
    };

    const result = await FormularioSepdavi.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.where = params;

    const result = await FormularioSepdavi.findOne(query);

    if (!result) return null;

    return result.toJSON();
  }

  return {
    findAll,
    findOne,
    findById       : (id) => Repository.findById(id, FormularioSepdavi),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, FormularioSepdavi, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, FormularioSepdavi, t),
  };
};
