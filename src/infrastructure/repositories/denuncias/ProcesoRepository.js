'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');

module.exports = function procesoRepository (models, Sequelize) {
  const { Proceso, Formulario, rol, FormularioProceso } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};
    query.distinct = true;
    query.include = [
      {
        attributes: [
          'id',
          'nombre',
          'configuracion'
        ],
        through : { attributes: [] },
        model   : Formulario,
        as      : 'formularios'
      }
    ];

    return Proceso.findAndCountAll(query);
  }

  async function findByUUID (idProceso) {
    const query = {
      where: {
        id: idProceso
      },
      order: [
        [Sequelize.literal('"formularios.creacion_relacion"'), 'ASC']
      ]
    };

    query.include = [
      {
        attributes: [
          'id',
          'nombre',
          'configuracion',
          [Sequelize.literal(`
          (SELECT _created_at FROM formulario_proceso
            WHERE id_formulario = formularios.id AND id_proceso = proceso.id
              AND _deleted_at IS NULL
            )`), 'creacion_relacion']
        ],
        through : { attributes: [] },
        model   : Formulario,
        as      : 'formularios'
      }
    ];
    const result = await Proceso.findOne(query);
    return result.toJSON();
  }

  async function findRoles (idProceso) {
    const query = {};

    query.include = [
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [],
        model      : Proceso,
        as         : 'procesos',
        where      : { id: idProceso }
      }
    ];

    const result = await rol.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findRoles,
    findByUUID,
    findAll,
    findOne        : params => Repository.findOne(params, Proceso),
    findById       : (id) => Repository.findById(id, Proceso),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Proceso, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Proceso, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, Proceso, t)

  };
};
