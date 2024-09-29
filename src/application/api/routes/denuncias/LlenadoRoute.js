'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { LlenadoController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/trabajo', LlenadoController.findAll);

  return api;
};
