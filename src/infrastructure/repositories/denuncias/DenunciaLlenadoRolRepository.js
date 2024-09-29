'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function denunciaLlenadoRolRepository (models, Sequelize) {
  const { denunciaLlenadoRol, usuario } = models;
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

    if(params.idDenuncia){
        query.where.idDenuncia = params.idDenuncia;
    }

    if(params.idRol){
        query.where.idRol = params.idRol;
    }

    if(params.idUsuarioAsignado){
      query.where.idUsuarioAsignado = params.idUsuarioAsignado;
    }

    if(params.estado){
      query.where.estado = params.estado;
    }

    const resultado = await denunciaLlenadoRol.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, denunciaLlenadoRol),
    findById       : (id) => Repository.findById(id, denunciaLlenadoRol),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denunciaLlenadoRol, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denunciaLlenadoRol, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denunciaLlenadoRol, t)
  };
};
