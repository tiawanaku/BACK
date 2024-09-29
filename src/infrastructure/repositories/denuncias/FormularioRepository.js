'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function formularioRepository (models, Sequelize) {
  const { Formulario, Proceso } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);

    query.where = {};

    query.distinct = true;

    let whereProceso = null;

    if (params.idProceso) {
      whereProceso = { id: params.idProceso };
    }

    query.include = [
      {
        required   : !!whereProceso,
        through    : { attributes: [] },
        attributes : ['id', 'nombre'],
        model      : Proceso,
        as         : 'procesos',
        where      : whereProceso
      }
    ];

    const result = await Formulario.findAndCountAll(query);
    return toJSON(result);
  }

  async function findForms (params = {}) {
    const query = getQuery(params);

    query.where = {};

    const result = await Formulario.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.where = params;

    query.include = [
      {
        through    : { attributes: [] },
        attributes : ['id', 'nombre'],
        model      : Proceso,
        as         : 'procesos'
      }
    ];

    const result = await Formulario.findOne(query);

    if (!result) return null;

    return result.toJSON();
  }

  return {
    findForms,
    findAll,
    findOne,
    findById       : (id) => Repository.findById(id, Formulario),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Formulario, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Formulario, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, Formulario, t)
  };
};
