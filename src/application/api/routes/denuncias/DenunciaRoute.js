'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { DenunciaController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/denuncia',  AuthMiddleware.verificarPermisos(['denuncia:listar']), DenunciaController.listar);

  api.get('/denuncia/:id', AuthMiddleware.verificarPermisos(['denuncia:ver']),  DenunciaController.mostrar);

  api.patch('/denuncia/reasignar', AuthMiddleware.verificarPermisos(['denuncia:reasignar']), DenunciaController.reasignar);

  api.patch('/denuncia/:id/cerrar', AuthMiddleware.verificarPermisos(['denuncia:cerrar']), DenunciaController.cerrarDenuncia);

  api.put('/denuncia/:id/concluir', AuthMiddleware.verificarPermisos(['denuncia:concluir']), DenunciaController.concluirDenuncia);

  api.get('/denuncia/:id/reporte', AuthMiddleware.verificarPermisos(['denuncia:pdf']), DenunciaController.reporteDenuncia);

  api.post('/denuncia', AuthMiddleware.verificarPermisos(['denuncia:crear']), DenunciaController.crear);

  api.put('/denuncia/:id', AuthMiddleware.verificarPermisos(['denuncia:actualizar']), DenunciaController.actualizar);

  api.delete('/denuncia/:id', AuthMiddleware.verificarPermisos(['denuncia:eliminar']), DenunciaController.eliminar);

  api.get('/denuncia/reporte/filtros', AuthMiddleware.verificarPermisos(['busqueda:ver']), DenunciaController.getFiltrosReporte);

  api.get('/denuncia/listado/filtrado-avanzado', AuthMiddleware.verificarPermisos(['busqueda:filtrado:avanzado']), DenunciaController.filtradoAvanzado);

  api.get('/denuncia/excel/filtrado-datos', AuthMiddleware.verificarPermisos(['busqueda:filtrado:avanzado']), DenunciaController.generarExcel);

  api.get('/denuncia/datos/saj/:codigosaj', AuthMiddleware.verificarPermisos(['denuncia:ver']), DenunciaController.datosSaj);

  api.get('/denuncia/sucursales/saj', AuthMiddleware.verificarPermisos(['denuncia:ver']), DenunciaController.sucursalesSaj);

  api.put('/denuncia/cerrar/saj/:codigosaj', AuthMiddleware.verificarPermisos(['denuncia:actualizar']), DenunciaController.actualizarSaj);

  api.get('/denuncia/seguimiento/:codigosaj', DenunciaController.seguimientoSaj);

  api.get('/denuncia/contadores/dashboard', DenunciaController.contadoresDashboard);

  api.put('/denuncia/:id/habilitar/trabajo/social', AuthMiddleware.verificarPermisos(['denuncia:concluir']), DenunciaController.habilitarTrabajoSocial);

  return api;
};
