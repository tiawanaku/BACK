
'use strict';
const debug = require('debug')('app:controller:REPORTE');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
const { app } = require('../../../../common/config');
const fs = require('fs');

module.exports = function setupEntidadController (services) {
  const { ArchivoService } = services;

  async function listar (req, res) {
    try {
      const respuesta = await ArchivoService.listar(req.query);
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
      const respuesta = await ArchivoService.createOrUpdate(data);
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
      const respuesta = await ArchivoService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      debug('Eliminando archivo');
      const respuesta = await ArchivoService.deleteItem({
        id          : req.params.id,
        userDeleted : req.user.idUsuario
      });
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function subirArchivo (req, res) {
    try {
      const dir = app.archivosPublicos;
      const archivos = req.files;
      const archivosArray = [];
      for (const key in archivos) {
        const pathFile = `${dir}/${archivos[key].name}`;
        await archivos[key].mv(pathFile);
        archivosArray.push(archivos[key].name);
      }
      debug('Eliminando entidad');
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, archivosArray));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function recuperarArchivo (req, res) {
    try {
      const dir = app.archivosPrivados;
      const { id } = req.params;
      const archivo = await ArchivoService.findOne({ id });

      if (!archivo) {
        throw new Error('El archivo no existe.');
      }

      const rutaArchivo = `${archivo.seguimiento.denuncia.idTipoProceso}/${archivo.seguimiento.denuncia.id}/${archivo.archivo}`;

      const existeArchivo = fs.existsSync(`${dir}/${rutaArchivo}`);

      if (!existeArchivo) {
        throw new Error('El archivo no existe.');
      }

      archivo.codigo = fs.readFileSync(`${dir}/${rutaArchivo}`, { encoding: 'base64' });

      const respuesta = {
        nombre : archivo.archivo,
        codigo : archivo.codigo
      };
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    recuperarArchivo,
    subirArchivo,
    listar,
    eliminar,
    actualizar,
    crear
  };
};
