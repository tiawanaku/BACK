'use strict';

module.exports = function setupArchivo (api, controllers, middlewares) {
  const { ArchivoController } = controllers;

  api.post('/archivo', ArchivoController.subirArchivo);

  api.get('/archivo/:id', ArchivoController.recuperarArchivo);

  api.delete('/archivo/:id', ArchivoController.eliminar);

  return api;
};
