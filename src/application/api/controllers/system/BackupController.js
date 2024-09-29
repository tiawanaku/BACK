'use strict';

const debug = require('debug')('app:controller:auth');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
const { exec } = require('child_process');
const { promisify } = require('util');
const { database, username, password, host, port } = require('../../../../common/config/db');
const fs = require('fs');
const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.tar`;


module.exports = function backupController () {

  async function generarBackup (req, res) {
    try {
        const execAsync = promisify(exec);
        const { stdout } = await execAsync(`pg_dump ${database} -U ${username} -h ${host} -F c`);
        console.log(`Backup exitoso`);
        // Configura la respuesta HTTP para descargar el archivo
        res.attachment('backup.sql');
        res.type('application/sql');
        res.send(stdout);
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    generarBackup
  };
};
