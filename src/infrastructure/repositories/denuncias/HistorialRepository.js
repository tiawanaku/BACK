'use strict';

const Repository = require('../Repository');

const { getQuery } = require('../../lib/util');

module.exports = function historialRepository (models, Sequelize) {
  const { historial, usuario } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};
    query.include = [
      {
        model   : usuario,
        as      : 'usuario'
      }
    ];
    
    if (params.idDenuncia) {
      query.where = {
        idDenuncia: params.idDenuncia
      }
    }

    if (params.tipo) {
      query.where.tipo = params.tipo;
    }

    const resp =await historial.findAndCountAll(query);
    return resp;
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, historial),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, historial, t),
  };
};
