'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { SeguimientoController } = controllers;

  api.get('/seguimiento', SeguimientoController.listar);
  api.post('/seguimiento', SeguimientoController.crear);
  api.put('/seguimiento/:id', SeguimientoController.actualizar);
  api.delete('/seguimiento/:id', SeguimientoController.eliminar);

  return api;
};
