
'use strict';
const debug = require('debug')('app:controller:REPORTE');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');

module.exports = function setupSeguimientoController (services) {
  const { SeguimientoService } = services;

  async function listar (req, res) {
    try {
      const respuesta = await SeguimientoService.listar(req.query);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function crear (req, res) {
    try {
      const data = req.body;
      debug('creando entidad');
      data.userCreated = req.user.idUsuario; // corregir
      data.idUsuario = req.user.idUsuario;
      data.tipoSeguimiento = 'USUARIO';
      const respuesta = await SeguimientoService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizar (req, res) {
    try {
      debug('actualizando entidad'); 
      const data = req.body;
      data.id = req.params.id;
      data.userUpdated = req.user.idUsuario;
      const respuesta = await SeguimientoService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizarAtencion (req, res) {
    try {
      debug('actualizando'); 
      const data = req.body;
      data.id = req.params.id;
      data.userUpdated = req.user.idUsuario;
      const respuesta = await SeguimientoService.actualizarAtencion(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      const respuesta = await SeguimientoService.deleteItem({
        id          : req.params.id,
        userDeleted : req.user.idUsuario
      });
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    listar,
    eliminar,
    actualizar,
    actualizarAtencion,
    crear
  };
};
