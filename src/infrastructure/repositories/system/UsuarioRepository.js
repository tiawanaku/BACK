'use strict';

const { query } = require('express');
const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { TIPOPROCESO } = require('../../../common/config/constants');

module.exports = function usuariosRepository (models, Sequelize) {
  const Op = Sequelize.Op;
  const { usuario, rol, entidad, menu, Proceso, Formulario, parametro } = models;

  async function findAll (params = {}) {
    const query = getQuery(params);
    
    const {IDPROCESODEFENSORIA, IDPROCESOSLIM} = TIPOPROCESO;

    query.attributes = [
      'celular',
      'correoElectronico',
      'estado',
      'foto',
      'id',
      'nombres',
      'cargo',
      'idEntidad',
      'numeroDocumento',
      'primerApellido',
      'segundoApellido',
      'telefono',
      'usuario',
      'nivel',
      'createdAt'
    ];
    query.where = {};
    let whereDefensorias = {};
    let whereSlims = {};

    query.where.estado = 'ACTIVO';

    if (params.exclude) {
      query.where.id = {
        [Op.notIn]: Array.isArray(params.exclude) ? params.exclude : [params.exclude]
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.usuario) {
      query.where.usuario = {
        [Op.iLike]: `%${params.usuario}%`
      };
    }

    if (params.nombreCompleto) {
      query.where[Op.or] = [
        { nombres: { [Op.iLike]: `%${params.nombreCompleto}%` } },
        { primerApellido: { [Op.iLike]: `%${params.nombreCompleto}%` } },
        { segundoApellido: { [Op.iLike]: `%${params.nombreCompleto}%` } }
      ];
    }

    if (params.nombres) {
      query.where.nombres = {
        [Op.iLike]: `%${params.nombres}%`
      };
    }

    if (params.primerApellido) {
      query.where.primerApellido = {
        [Op.iLike]: `%${params.primerApellido}%`
      };
    }

    if (params.segundoApellido) {
      query.where.segundoApellido = {
        [Op.iLike]: `%${params.segundoApellido}%`
      };
    }

    if (params.numeroDocumento) {
      query.where.numeroDocumento = {
        [Op.iLike]: `%${params.numeroDocumento}%`
      };
    }

    if (params.correoElectronico) {
      query.where.correoElectronico = {
        [Op.iLike]: `%${params.correoElectronico}%`
      };
    }

    if (params.celular) {
      query.where.celular = {
        [Op.iLike]: `%${params.celular}%`
      };
    }

    if (params.defensorias && Array.isArray(params.defensorias) && IDPROCESODEFENSORIA == params.idProceso) {
      whereDefensorias.id = { [Op.in]: params.defensorias };
    }
    
    if (params.slims && Array.isArray(params.slims) && IDPROCESOSLIM == params.idProceso) {
      whereSlims.id = { [Op.in]: params.slims };
    }

    const whereRoles = {};
    let requiredRoles = false;
    if (params.idRoles) {
      requiredRoles = true;
      whereRoles.id = {
        [Op.in]: params.idRoles
      };
    }

    

    query.include = [
      {
        required : requiredRoles,
        through  : { attributes: [] },
        model    : rol,
        as       : 'roles',
        where    : whereRoles
      },
      {
        model : entidad,
        as    : 'entidad'
      },
      {
        model : parametro,
        as    : 'slims'
      },
      {
        model : parametro,
        as    : 'defensorias'
      }
    ];

    if (Object.keys(whereDefensorias).length > 0) {
      query.include[3].required = true;
      query.include[3].where = whereDefensorias;
    };

    if (Object.keys(whereSlims).length > 0) {
      query.include[2].required = true;
      query.include[2].where = whereSlims;
    };

    const result = await usuario.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'usuario',
      'nombres',
      'primerApellido',
      'segundoApellido',
      'numeroDocumento',
      'telefono',
      'celular',
      'correoElectronico',
      'foto',
      'nivel',
      'estado'
    ];

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'nombre', 'sigla', 'nivel', 'idEntidad'],
        model      : entidad,
        as         : 'entidad'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [
          'id',
          'idEntidad',
          'nombre',
          'descripcion',
          'estado'
        ],
        model : rol,
        as    : 'roles'
      },
      {
        model : parametro,
        as    : 'slims'
      },
      {
        model : parametro,
        as    : 'defensorias'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findByCi (params = {}) {
    const query = {};

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'nombre', 'sigla', 'nivel', 'idEntidad'],
        model      : entidad,
        as         : 'entidad'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [
          'id',
          'idEntidad',
          'nombre',
          'descripcion',
          'estado'
        ],
        model : rol,
        as    : 'roles'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function login (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'contrasena',
      'usuario',
      'nombres',
      'primerApellido',
      'segundoApellido',
      'numeroDocumento',
      'telefono',
      'celular',
      'correoElectronico',
      'foto',
      'nivel',
      'estado'
    ];

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'nombre', 'sigla', 'nivel', 'idEntidad'],
        model      : entidad,
        as         : 'entidad'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [
          'id',
          'idEntidad',
          'nombre',
          'descripcion',
          'estado'
        ],
        model   : rol,
        as      : 'roles',
        include : [
          {
            through    : { attributes: [] },
            attributes : [
              'id',
              'nombre',
              'descripcion',
              'estado'
            ],
            model   : Proceso,
            include : [
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
            ]
          }
        ],
      },
      {
        attributes : ['id', 'nombre'],
        model : parametro,
        as    : 'slims'
      },
      {
        attributes : ['id', 'nombre'],
        model : parametro,
        as    : 'defensorias'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findById (id) {
    const query = {};

    query.where = {
      id,
      estado: 'ACTIVO'
    };

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findByIdWithRol (params) {
    const query = {};
    
    const whereRoles = {};
    let requiredRoles = false;
    if (params.idRol) {
      requiredRoles = true;
      whereRoles.id = params.idRol
    }

    query.include = [
      {
        required : requiredRoles,
        through  : { attributes: [] },
        model    : rol,
        as       : 'roles',
        where    : whereRoles
      },
      {
        model : entidad,
        as    : 'entidad'
      }
    ];

    query.where = {
      id: params.id,
      estado: 'ACTIVO'
    };

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function createOrUpdate (usuarioParam, t) {
    const cond = {
      where: {
        id: usuarioParam.id || null
      }
    };

    const item = await usuario.findOne(cond);

    if (item) {
      let updated;
      try {
        if (t) {
          cond.transaction = t;
        }
        updated = await usuario.update(usuarioParam, cond);
      } catch (e) {
        errorHandler(e);
      }
      const result = updated ? await usuario.findOne(cond) : item;

      if (result) {
        return result.toJSON();
      }
      return null;
    }

    let result;
    try {
      result = await usuario.create(usuarioParam, t ? { transaction: t } : {});
    } catch (e) {
      errorHandler(e);
    }
    return result.toJSON();
  }

  async function verificarCorreoElectronico (params) {
    const query = {};
    query.where = {};

    if (params.correoElectronico) {
      Object.assign(query.where, { correoElectronico: params.correoElectronico });
    }

    if (params.usuario) {
      Object.assign(query.where, { usuario: params.usuario });
    }

    if (params.usuario && params.correoElectronico) {
      query.where = {
        [Op.or]: [
          {
            usuario: params.usuario
          },
          {
            correoElectronico: params.correoElectronico
          }
        ]
      };
    }

    if (params.id) {
      query.where.id = {
        [Op.not]: params.id
      };
    }

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findCount () {
    
    const result = await usuario.count();
    return result;
  }

  return {
    findByCi,
    login,
    findById,
    findByIdWithRol,
    verificarCorreoElectronico,
    findAll,
    findOne,
    createOrUpdate,
    findCount,
    deleteItem     : (id, t) => Repository.deleteItem(id, usuario, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, usuario, t)
  };
};
