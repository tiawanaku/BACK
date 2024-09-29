'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { DpaController } = controllers;

  api.get('/dpa', DpaController.findAll);
  api.post('/dpa', DpaController.crear);
  api.put('/dpa/:id', DpaController.actualizar);
  api.delete('/dpa/:id', DpaController.eliminar);

  return api;
};
