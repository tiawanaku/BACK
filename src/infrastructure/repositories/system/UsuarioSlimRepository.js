'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function UsuarioSlimRepository (models, Sequelize) {
  const { usuarioSlim } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idUsuario) {
      query.where.idUsuario = params.idUsuario;
    }

    const resultado = await usuarioSlim.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, usuarioSlim),
    findById       : (id) => Repository.findById(id, usuarioSlim),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, usuarioSlim, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, usuarioSlim, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, usuarioSlim, t)
  };
};
