'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { HistorialController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/historial/:id', HistorialController.findOne);
  api.get('/historial', HistorialController.findAll);

  return api;
};
