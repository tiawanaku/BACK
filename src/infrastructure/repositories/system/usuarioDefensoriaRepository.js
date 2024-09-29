'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function UsuarioDefensoriaRepository (models, Sequelize) {
  const { usuarioDefensoria } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idUsuario) {
      query.where.idUsuario = params.idUsuario;
    }

    const resultado = await usuarioDefensoria.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, usuarioDefensoria),
    findById       : (id) => Repository.findById(id, usuarioDefensoria),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, usuarioDefensoria, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, usuarioDefensoria, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, usuarioDefensoria, t)
  };
};
