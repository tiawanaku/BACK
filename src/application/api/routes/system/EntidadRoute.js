'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { EntidadController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/entidades', AuthMiddleware.verificarPermisos(['entidades:listar']), EntidadController.listar);
  api.post('/entidades', AuthMiddleware.verificarPermisos(['entidades:crear']), EntidadController.crear);
  api.put('/entidades/:id', AuthMiddleware.verificarPermisos(['entidades:actualizar']), EntidadController.actualizar);
  api.delete('/entidades/:id', AuthMiddleware.verificarPermisos(['entidades:eliminar']), EntidadController.eliminar);

  return api;
};
