'use strict';

const debug = require('debug')('app:service:rol');
const { ErrorApp } = require('../../lib/error');

module.exports = function rolService (repositories, helpers, res) {
  const {
    RolRepository,
    MenuRepository,
    RolMenuRepository,
    RolPermisoRepository,
    RolProcesoRepository,
    PermisoRepository,
    transaction
  } = repositories;

  async function findAll (params = {}) {
    debug('Lista de roles|filtros');
    try {
      const resultado = await RolRepository.findAll(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function listarPermisos (idRol) {
    debug('Lista de roles|filtros');
    try {
      const { rows: menus } = await MenuRepository.findAll();
      const { rows: permisos } = await PermisoRepository.findAll();

      for (const menu of menus) {
        menu.permisos = permisos.filter(x => x.idMenu === menu.id);
      }

      menus.push({
        nombre   : 'PERMISOS SIN VISTA',
        icono    : 'apps',
        esMenu   : false,
        permisos : permisos.filter(x => !x.idMenu)
      });

      let permisosRol = [];
      if (idRol) {
        permisosRol = await PermisoRepository.findAll({ idRol });
        for (const menu of menus) {
          for (const permiso of menu.permisos) {
            const existe = permisosRol.rows.find(x => x.id === permiso.id);
            if (existe) permiso.permitido = true;
          }
        }
      }
      return menus;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findById (id) {
    debug('Buscando rol por ID');
    try {
      const resultado = await RolRepository.findById(id);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar rol');
    let rol;
    let transaccion;
    try {
      transaccion = await transaction.create();
      rol = await RolRepository.createOrUpdate(data, transaccion);
      if (data.menus) {
        await RolMenuRepository.deleteItemCond({
          idRol       : rol.id,
          userDeleted : data.userCreated || data.userUpdated
        }, transaccion);
        for (const menu of data.menus) {
          await RolMenuRepository.createOrUpdate({
            idRol       : rol.id,
            idMenu      : menu,
            userCreated : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      if (data.permisos) {
        await RolPermisoRepository.deleteItemCond({
          idRol       : rol.id,
          userDeleted : data.userCreated || data.userUpdated
        }, transaccion);

        for (const permiso of data.permisos) {
          await RolPermisoRepository.createOrUpdate({
            idRol       : rol.id,
            idPermiso   : permiso,
            userCreated : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      if (data.procesos) {
        await RolProcesoRepository.deleteItemCond({
          idRol       : rol.id,
          userDeleted : data.userCreated || data.userUpdated
        }, transaccion);
        for (const proceso of data.procesos) {
          await RolProcesoRepository.createOrUpdate({
            idRol       : rol.id,
            idProceso   : proceso,
            userCreated : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      await transaction.commit(transaccion);
      return rol;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    debug('Eliminando rol', params);
    try {
      const resultado = await RolProcesoRepository.deleteItemCond(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    deleteItem,
    listarPermisos,
    findAll,
    findById,
    createOrUpdate
  };
};
