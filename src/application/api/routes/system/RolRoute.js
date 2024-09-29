'use strict';
module.exports = function setupSocio (api, controllers, middlewares) {
  const { RolController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/roles', AuthMiddleware.verificarPermisos(['roles:listar']), RolController.listar);
  api.post('/roles', AuthMiddleware.verificarPermisos(['roles:crear']), RolController.crear);
  api.put('/roles/:id', AuthMiddleware.verificarPermisos(['roles:actualizar']), RolController.actualizar);
  api.delete('/roles/:id', AuthMiddleware.verificarPermisos(['roles:eliminar']), RolController.eliminar);
  api.get('/roles/permisos', AuthMiddleware.verificarPermisos(['roles:permisos:listar']), RolController.listarPermisos);

  return api;
};
