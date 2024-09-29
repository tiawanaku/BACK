'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function procesoService (repositories, helpers, res) {
  const { FormularioRepository, transaction } = repositories;

  async function listar (params) {
    try {
      const comentarios = await FormularioRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const formulario = await FormularioRepository.findOne(params);
      if (!formulario) throw new Error('El formulario no existe');

      for (const componente of formulario.configuracion) {
        if (!componente.operadorReglas) componente.operadorReglas = 'or';
        if (!componente.reglas) componente.reglas = [];
        if (!componente.filtros) componente.filtros = [];
        if (!componente.tipoOpciones) componente.tipoOpciones = 'manual';
        if (!componente.ejemploRespuesta) componente.ejemploRespuesta = [];

        if (componente.type === 'datagrid') {
          for (const subComponente of componente.options) {
            if (!subComponente.operadorReglas) subComponente.operadorReglas = 'or';
            if (!subComponente.reglas) subComponente.reglas = [];
            if (!subComponente.filtros) subComponente.filtros = [];
            if (!subComponente.tipoOpciones) subComponente.tipoOpciones = 'manual';
            if (!subComponente.ejemploRespuesta) subComponente.ejemploRespuesta = [];
          }
        }
      }

      return formulario;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar Entidad');
    let denuncia;
    let transaccion;
    try {
      transaccion = await transaction.create();

      denuncia = await FormularioRepository.createOrUpdate(data, transaccion);

      await transaction.commit(transaccion);
      return denuncia;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (params) {
    try {
      const resultado = await FormularioRepository.deleteItemCond(params);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function clonarFormulario (data) {
    debug('Crear o actualizar Entidad');
    let formulario;
    let transaccion;
    try {
      transaccion = await transaction.create();

      formulario = await FormularioRepository.findOne({ id: data.id }, transaccion);

      if (!formulario) throw new Error('No existe el formulario que quiere duplicar');

      delete formulario.id;
      delete formulario.createdAt;
      delete formulario.updatedAt;
      formulario.nombre = data.nombre;
      formulario.userCreated = data.userCreated;
      formulario.userUpdated = data.userCreated;

      formulario = await FormularioRepository.createOrUpdate(formulario, transaccion);

      await transaction.commit(transaccion);
      return formulario;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    clonarFormulario,
    findOne,
    listar,
    createOrUpdate,
    deleteItem
  };
};
