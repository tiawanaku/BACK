'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { SeguimientoController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/seguimiento', SeguimientoController.listar);
  api.post('/seguimiento', SeguimientoController.crear);
  api.put('/seguimiento/:id', SeguimientoController.actualizar);
  api.delete('/seguimiento/:id', SeguimientoController.eliminar);

  return api;
};
