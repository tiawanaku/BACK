'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { DenunciaController, ReporteController } = controllers;
  const { AuthMiddleware } = middlewares;

  // REPORTE DEL DASHBOARD
  api.get('/reporte/denuncias', DenunciaController.reporte);

  api.get('/reporte/lgi-ft', AuthMiddleware.verificarPermisos(['reporte:LGI/FT']), DenunciaController.reporteAvanzadoLGIFT);

  api.get('/reporte/bienes-cauteleados', AuthMiddleware.verificarPermisos(['reporte:bienesCautelados']), DenunciaController.reporteBienesCautelados);

  api.get('/reporte/penas-impuestas', AuthMiddleware.verificarPermisos(['reporte:penasImpuestas']), DenunciaController.reportePenasImpuestas);

  api.get('/reporte/solo-delitos-precedentes', AuthMiddleware.verificarPermisos(['reporte:soloDelitosPrecedentes']), DenunciaController.reporteSoloDelitosPrecedentes);

  api.get('/reporte/sentencias-lgi', AuthMiddleware.verificarPermisos(['reporte:sentenciasLGI']), DenunciaController.reporteSentenciasLGI);

  api.get('/reporte/bienes-decomisados', AuthMiddleware.verificarPermisos(['reporte:bienesDecomisados']), DenunciaController.reporteBienesDecomisados);

  // api.get('/reporte/excel-avanzado', DenunciaController.generarExcel);

  api.get('/reporte/priorizados-porcentaje',  ReporteController.priorizadosPorcentaje);
  // api.get('/reporte/priorizados-porcentaje', AuthMiddleware.verificarPermisos(['reporte:priorizadosPorcentajes']), ReporteController.priorizadosPorcentaje);

  api.get('/reporte/bienes-confiscados', AuthMiddleware.verificarPermisos(['reporte:bienesConfiscados']), DenunciaController.reporteBienesConfiscados);
  api.get('/reporte/bienes-incautados', AuthMiddleware.verificarPermisos(['reporte:bienesIncautados']), DenunciaController.reporteBienesIncautados);

  return api;
};
