'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function ParametroRepository (models, Sequelize) {
  const { parametro, Proceso } = models;
  const Op = Sequelize.Op;
  const attributes = ['id', 'codigo', 'grupo', 'nombre', 'descripcion', 'otroe', 'estado'];

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    query.order = [
      ['orden', 'ASC'],
      ['nombre', 'ASC'],
      ['grupo', 'ASC']
    ];

    if (params.estado) {
      query.where.estado = params.estado;
    }

    // if (params.grupo) {
    //   query.where.grupo = {
    //     [Op.iLike]: `%${params.grupo}%`
    //   };
    // }

    if (params.grupo) query.where.grupo = params.grupo;

    if (params.idPadre) query.where.idPadre = params.idPadre;

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.descripcion) {
      query.where.descripcion = {
        [Op.iLike]: `%${params.descripcion}%`
      };
    }

    if (params.idProceso) query.where.idProceso = Array.isArray(params.idProceso) ?  { [Op.in]: params.idProceso } : params.idProceso;

    query.include = [
      {
        attributes : ['id', 'nombre', 'sigla', 'descripcion'],
        model      : Proceso,
        as         : 'proceso'
      }
    ];
    // query.attributes = attributes;
    const result = await parametro.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, parametro),
    findById       : (id) => Repository.findById(id, parametro, attributes),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, parametro, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, parametro, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, parametro, t)
  };
};
