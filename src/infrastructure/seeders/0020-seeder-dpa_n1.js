'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id         : 'da235029-17a3-4943-9c5b-0eeeeb0511fe',
    codigo_ine : null,
    nivel      : 1,
    nombre     : 'BOLIVIA',
    latitud    : null,
    longitud   : null,
    id_padre   : null
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_dpa', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
