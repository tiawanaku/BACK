'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function dpaRepository (models, Sequelize) {
  const { Dpa } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.nivel) {
      query.where.nivel = params.nivel;
    }

    if (params.idPadre) {
      query.where.idPadre = params.idPadre;
    }

    query.include = [];
    // query.attributes = attributes;
    return Dpa.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Dpa),
    findById       : (id) => Repository.findById(id, Dpa),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Dpa, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Dpa, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, Dpa, t)
  };
};
