'use strict';

const Repository = require('../Repository');
const { getQuery, toJSON } = require('../../lib/util');

module.exports = function entidadRepository (models, Sequelize) {
  const { entidad } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'sigla',
      'web',
      'email',
      'direccion',
      'telefono',
      'estado',
      'nivel',
      'idEntidad'
    ];
    query.where = {};

    if (params.search) {
      query.where = {
        ...query.where,
        ...{
          [Op.or]: [
            {
              nombre: {
                [Op.iLike]: `%${params.search}%`
              }
            },
            {
              sigla: {
                [Op.iLike]: `%${params.search}%`
              }
            }
          ]
        }
      };
    }

    if (params.nombre) query.where.nombre = { [Op.iLike]: `%${params.nombre}%` };

    if (params.sigla) query.where.sigla = { [Op.iLike]: `%${params.sigla}%` };

    if (params.correo) query.where.email = { [Op.iLike]: `%${params.correo}%` };

    if (params.nivel) query.where.nivel = params.nivel;

    if (params.id) query.where.id = params.id;

    query.include = [];

    return entidad.findAndCountAll(query);
  }

  async function findDependientes (entidades, nivel) {
    const query = {
      attributes: [
        'id',
        'nombre',
        'descripcion',
        'sigla',
        'web',
        'email',
        'direccion',
        'telefono',
        'estado',
        'nivel',
        'idEntidad'
      ],
      where: {
        idEntidad: {
          [Op.in]: entidades
        },
        nivel
      }
    };
    const result = await entidad.findAndCountAll(query);
    return toJSON(result);
  }

  async function getSuperiores (id, entidadesSuperiores) {
    const query = {};

    query.where = { id };
    query.include  = [
      {
        attributes: [
          'id',
          'idEntidad',
          'nivel',
          'nombre',
          'sigla'
        ],
        model : entidad,
        as    : 'entidadPadre'
      }
    ];

    let resultado = await entidad.findOne(query);
    if (resultado) {
      resultado =  resultado.toJSON();
      if (resultado.entidadPadre) {
        entidadesSuperiores.push(resultado.entidadPadre);
        return getSuperiores(resultado.entidadPadre.id, entidadesSuperiores);
      }
    }
    return entidadesSuperiores;
  }
  function findOne (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'sigla',
      'web',
      'email',
      'direccion',
      'telefono',
      'estado',
      'nivel',
      'idEntidad'
    ];
    query.where = {};
    if (params.id) {
      query.where.id = params.id;
    }
    return entidad.findAndCountAll(query);
  }
  return {
    getSuperiores,
    findDependientes,
    findAll,
    // findOne,
    findOne        : (params) => Repository.findOne(params, entidad),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, entidad, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, entidad, t),
    deleteItemCond : (id, t) => Repository.deleteItemCond(id, entidad, t)
  };
};
