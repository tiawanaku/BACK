'use strict';

module.exports = function setupSeguimiento (api, controllers, middlewares) {
  const { SeguimientoController } = controllers;

  api.delete('/seguimiento/:id', SeguimientoController.eliminar);

  api.get('/seguimiento', SeguimientoController.listar);

  api.put('/seguimiento/atencion/:id', SeguimientoController.actualizarAtencion);

  return api;
};
