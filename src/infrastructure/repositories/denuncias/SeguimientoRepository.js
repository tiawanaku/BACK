'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function seguimientoRepository (models, Sequelize) {
  const { Seguimiento, archivo, usuario, participante, parametro } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    if (params.idDenuncia) {
      query.where.idDenuncia = params.idDenuncia;
    }

    if (params.nombreEtapaRol) {
      query.where.nombreEtapaRol = params.nombreEtapaRol;
    }

    query.include = [
      {
        model : archivo,
        as    : 'archivos'
      },
      {
        model : usuario,
        as    : 'usuarioCreacion'
      },
      {
        model : participante,
        as    : 'participantes'
      },
      {
        model      : parametro,
        as         : 'delitoImputacion'
      },
      {
        model      : parametro,
        as         : 'delitoConImpugnacion'
      },
      {
        model      : parametro,
        as         : 'delitoSinImpugnacion'
      },
      {
        model      : parametro,
        as         : 'delitoSentenciaAbsolutoria'
      },
      {
        model      : parametro,
        as         : 'delitoSentenciaCondenatoria'
      },
      {
        model      : parametro,
        as         : 'delitoSentenciaAbsolutoriaMixta'
      },
      {
        model      : parametro,
        as         : 'medidaCautelar'
      },
      {
        model      : parametro,
        as         : 'penal'
      },
      {
        model      : parametro,
        as         : 'etapaProcesal'
      },
    ];
    
    const resultado = await Seguimiento.findAndCountAll(query);
    return toJSON(resultado);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Seguimiento),
    findById       : (id) => Repository.findById(id, Seguimiento),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Seguimiento, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Seguimiento, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, Seguimiento, t)
  };
};
