'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  { id: '3498517a-d80a-4675-88b5-2d0bf29ae807', otros: '{ "validaciones": { "persona": { "genero": "FEMENINO" } } }', id_padre: '9a9cb996-7a57-4f77-a1d2-117582af1a67', grupo: 'DENUNCIA', nombre: 'formulario:denunciado', descripcion: 'Permiso para registrar el formulario de denunciado', estado: 'ACTIVO' }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_permiso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
