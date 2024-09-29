'use strict';

module.exports = function backupRoute (api, controllers, middlewares) {
  const { BackupController } = controllers;

  api.get('/backup', BackupController.generarBackup);

  return api;
};