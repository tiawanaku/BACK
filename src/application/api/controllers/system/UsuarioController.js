'use strict';

const debug = require('debug')('app:controller:auth');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');

module.exports = function setupUsuarioController (services) {
  const { UsuarioService } = services;

  async function listar (req, res) {
    try {
      // buscar usuarios
      const usuario =await UsuarioService.findOne(req.user.idUsuario);
      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await UsuarioService.listarUsuarios(req.query);
      } else if (usuario.nivel == 'MEDIO') {
        req.query.slims = usuario.slims.map(item => item.id);
        req.query.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await UsuarioService.listarUsuarios(req.query);
      }
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function mostrar (req, res) {
    try {
      const { id } = req.params;
      const respuesta = await UsuarioService.mostrar(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function crear (req, res) {
    try {
      const data = req.body;
      data.userCreated = req.user.idUsuario;
      const respuesta = await UsuarioService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizar (req, res) {
    try {
      const data = req.body;
      data.userUpdated = req.user.idUsuario;
      data.id = req.params.id;
      const respuesta = await UsuarioService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function cambiarContrasena (req, res) {
    try {
      const data = req.body;
      data.id = req.params.id;
      if (data.id.toString() !== req.user.idUsuario.toString()) {
        throw new Error('El identificacdor del usuario no corresponde al token de autenticación.');
      }
      const respuesta = await UsuarioService.cambiarContrasena(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      const respuesta = await UsuarioService.eliminar({
        id          : req.params.id,
        userDeleted : req.user.idUsuario
      });
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function asignarRoles (req, res) {
    try {
      const respuesta = await UsuarioService.asignarRoles(req.body);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reestablecerContrasena (req, res) {
    try {
      const id = req.params.id;
      const respuesta = await UsuarioService.reestablecerContrasena(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    reestablecerContrasena,
    cambiarContrasena,
    asignarRoles,
    listar,
    mostrar,
    crear,
    actualizar,
    eliminar
  };
};
