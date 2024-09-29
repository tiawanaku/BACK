'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function participanteRepository (models, Sequelize) {
  const { participante, parametro } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);

    query.where = {};

    if(params.idDenuncia){
      query.where.idDenuncia = params.idDenuncia;
    }

    if(params.id){
      query.where.id = params.id;
    }

    if(params.idTipoParticipante){
      query.where.idTipoParticipante = params.idTipoParticipante;
    }

    query.include =[{
      model      : parametro,
      as         : 'tipoParticipante'
    },
    {
      model      : parametro,
      as         : 'tipoDocumento'
    },
    {
      model      : parametro,
      as         : 'comunidad'
    },
    {
      model      : parametro,
      as         : 'genero'
    },
    {
      model      : parametro,
      as         : 'dirigidoActividad'
    },
    {
      model      : parametro,
      as         : 'edadContencion'
    },
    {
      model      : parametro,
      as         : 'tipoAcompanamiento'
    },
    {
      model      : parametro,
      as         : 'gradoInstruccion'
    },
    {
      model      : parametro,
      as         : 'estadoCivil'
    },
    /* {
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
    }, */
    // AGREGADOS ----gamea
    {
      model      : parametro,
      as         : 'nacimientoSlim'
    },
    {
      model      : parametro,
      as         : 'residenciaHabitual'
    },
    {
      model      : parametro,
      as         : 'relacionDenunciado'
    },
    {
      model      : parametro,
      as         : 'condicionesActividad'
    },
    {
      model      : parametro,
      as         : 'ingresoEconomico'
    },
    {
      model      : parametro,
      as         : 'idiomaHablado'
    },
    {
      model      : parametro,
      as         : 'gestante'
    }];
    const data = await participante.findAndCountAll(query);
    return toJSON(data);
  }

  async function findAllAtributos (params = {}) {
    const query = getQuery(params);

    query.attributes = [
      'id',
      'nombreCompleto'
    ];

    query.where = {};

    if(params.idDenuncia){
      query.where.idDenuncia = params.idDenuncia;
    }

    if(params.id){
      query.where.id = params.id;
    }

    const data = await participante.findAndCountAll(query);
    return toJSON(data);
  }

  return {
    findAll,
    findAllAtributos,
    findOne        : params => Repository.findOne(params, participante),
    findById       : (id) => Repository.findById(id, participante),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, participante, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, participante, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, participante, t)
  };
};
