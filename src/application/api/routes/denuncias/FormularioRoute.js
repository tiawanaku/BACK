'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { FormularioController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/formulario', AuthMiddleware.verificarPermisos(['formularios:listar']), FormularioController.listar);
  api.get('/formulario/:id', AuthMiddleware.verificarPermisos(['formularios:ver']), FormularioController.findOne);
  api.post('/formulario', AuthMiddleware.verificarPermisos(['formularios:crear']), FormularioController.crear);
  api.put('/formulario/:id', AuthMiddleware.verificarPermisos(['formularios:actualizar']), FormularioController.actualizar);
  api.delete('/formulario/:id', AuthMiddleware.verificarPermisos(['formularios:eliminar']), FormularioController.eliminar);

  api.patch('/formulario/:id/clonar', AuthMiddleware.verificarPermisos(['formularios:actualizar']), FormularioController.clonarFormulario);

  return api;
};
