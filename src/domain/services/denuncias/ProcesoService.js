'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');
// const { FORMULARIOS_SEPDAVI, ROLES_ID } = require('../../../common/config/constants');

module.exports = function procesoService (repositories, helpers, res) {
  const { ProcesoRepository, FormularioProcesoRepository, transaction, FormularioSepdavi } = repositories;

  async function listar (params) {
    try {
      const comentarios = await ProcesoRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const proceso = await ProcesoRepository.findOne(params);
      if (!proceso) {
        throw new Error('El proceso no existe');
      }
      return proceso;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findById (id, idRol) {
    try {
      const proceso = await ProcesoRepository.findByUUID(id);
      if (!proceso) {
        throw new Error('El proceso no existe');
      }
      proceso.formularios = await filtrarFormulariosPorRol(proceso.formularios, idRol);
      return proceso;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function filtrarFormulariosPorRol (formularios, idRol) {
    try {
      const resultado = [];
      const rol = idRol;
      const formularioSepdavi = await FormularioSepdavi.findAll({idRol: rol});
      formularios.forEach(elm => {
        formularioSepdavi.rows.forEach(elm2 =>{
          if( elm2.idFormulario == elm.id
          ) {
            resultado.push(elm);
          }
        });
      });
      return resultado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar Entidad');
    let proceso;
    let transaccion;
    try {
      transaccion = await transaction.create();

      if (!data.id) {
        const date = new Date();
        data.anio = date.getFullYear();
      }

      proceso = await ProcesoRepository.createOrUpdate(data, transaccion);

      if (data.formularios) {
        await FormularioProcesoRepository.deleteItemCond({
          idProceso   : proceso.id,
          userDeleted : data.userCreated || data.userUpdated
        }, transaccion);
        for (const idFormulario of data.formularios) {
          await FormularioProcesoRepository.createOrUpdate(
            {
              idProceso    : proceso.id,
              idFormulario : idFormulario,
              userCreated  : data.userCreated || data.userUpdated
            },
            transaccion);
        }
      }
      await transaction.commit(transaccion);
      return proceso;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    try {
      const resultado = await ProcesoRepository.deleteItemCond(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findById,
    findOne,
    listar,
    createOrUpdate,
    deleteItem
  };
};
