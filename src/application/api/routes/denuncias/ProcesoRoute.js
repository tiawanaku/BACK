'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { ProcesoController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/proceso', AuthMiddleware.verificarPermisos(['procesos:listar']), ProcesoController.listar);
  api.get('/proceso/:id', AuthMiddleware.verificarPermisos(['procesos:ver']), ProcesoController.mostrar);
  api.post('/proceso', AuthMiddleware.verificarPermisos(['procesos:crear']), ProcesoController.crear);
  api.put('/proceso/:id', AuthMiddleware.verificarPermisos(['procesos:actualizar']), ProcesoController.actualizar);
  api.delete('/proceso/:id', AuthMiddleware.verificarPermisos(['procesos:eliminar']), ProcesoController.eliminar);

  return api;
};
