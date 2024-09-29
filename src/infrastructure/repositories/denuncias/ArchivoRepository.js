'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function archivoRepository (models, Sequelize) {
  const { archivo, Seguimiento, denuncia } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    return archivo.findAndCountAll(query);
  }

  async function findOne (params = {}) {
    const query = {};
    query.where = params;
    query.include = [
      {
        model   : Seguimiento,
        as      : 'seguimiento',
        include : [
          {
            model : denuncia,
            as    : 'denuncia'
          }
        ]
      }
    ];
    const result = await archivo.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  return {
    findAll,
    findOne,
    findById       : (id) => Repository.findById(id, archivo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, archivo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, archivo, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, archivo, t)
  };
};
