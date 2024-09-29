'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { ParticipanteController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/participante', ParticipanteController.listar);
  api.get('/participante/atributos', ParticipanteController.listarAtributos);
  api.post('/participante', ParticipanteController.crear);
  api.put('/participante/:id', ParticipanteController.actualizar);
  api.delete('/participante/:id', ParticipanteController.eliminar);

  return api;
};
