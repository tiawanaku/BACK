'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function modulossRepository (models, Sequelize) {
  const { permiso, modulos, rol, menu } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    query.distinct = true;

    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'grupo',
      'idMenu',
      'estado',
      'createdAt',
      [Sequelize.literal('(SELECT FALSE)'), 'permitido']
    ];

    const whereRol = {};
    query.include = [
      {
        required   : false,
        attributes : [],
        model      : rol,
        as         : 'roles',
        where      : whereRol
      },
      {
        required : false,
        model    : menu,
        as       : 'menu'
      }
    ];

    if (params.nombre)  query.where.nombre = { [Op.iLike]: `%${params.nombre}%` };

    if (params.idRol) {
      query.include[0].required = true;
      whereRol.id = params.idRol;
    }

    const result = await permiso.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params) {
    const query = {};

    query.where = params;

    query.attributes =  [
      'id',
      'nombre',
      'descripcion',
      'grupo',
      'idMenu',
      'estado'
    ];

    query.include = [
      {
        required : false,
        model    : menu,
        as       : 'menu'
      }
    ];

    const result = await permiso.findOne(query);

    if (!result) return null;

    return result.toJSON();
  }

  async function findByRoles (roles) {
    const query = {};

    query.where = {
      estado: 'ACTIVO'
    };

    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'estado'
    ];

    query.include = [
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [],
        model      : rol,
        as         : 'roles',
        where      : {
          id: {
            [Op.in]: roles
          }
        }
      }
    ];

    const result = await permiso.findAndCountAll(query);
    return toJSON(result);
  }

  async function verificarPermisos (params) {
    const query = {
      attributes: ['id']
    };
    query.where = {
      nombre: {
        [Op.in]: params.permisos
      }

    };

    query.include = [
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [],
        model      : rol,
        as         : 'roles',
        where      : {
          id: {
            [Op.in]: params.roles
          }
        }
      }
    ];

    const result = await permiso.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  return {
    findByRoles,
    verificarPermisos,
    findAll,
    findOne,
    findById       : (id) => Repository.findById(id, permiso),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, permiso, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, permiso, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, permiso, t)
  };
};
