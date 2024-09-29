'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function rolesRepository (models, Sequelize) {
  const { rol, Proceso, menu, entidad } = models;
  const Op = Sequelize.Op;

  const attributes = ['id', 'idEntidad', 'nombre', 'descripcion', 'estado', 'createdAt'];

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = ['id', 'idEntidad', 'nombre', 'descripcion', 'estado', 'createdAt'];
    query.where = {};

    query.distinct = true;
    // query.subQuery = false;

    query.include = [
      {
        attributes: [
          'id',
          'sigla',
          'nombre',
          'idEntidad',
          'nivel'
        ],
        model : entidad,
        as    : 'entidad'
      },
      {
        attributes: [
          'id',
          'nombre',
          'ruta',
          'icono',
          'idMenu',
          'orden',
          'estado'
        ],
        through : { attributes: [] },
        model   : menu,
        as      : 'menus'
      },
      {
        through : { attributes: [] },
        model   : Proceso
      }
    ];

    if (params.idEntidad) {
      query.where.idEntidad = params.idEntidad;
    }

    if (params.entidades && !params.idEntidad) {
      query.where.idEntidad = {
        [Op.in]: params.entidades
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.descripcion) {
      query.where.nombre = {
        [Op.iLike]: `%${params.descripcion}%`
      };
    }

    return rol.findAndCountAll(query);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, rol),
    findById       : id => Repository.findById(id, rol, attributes),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, rol, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, rol, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, rol, t)

  };
};
