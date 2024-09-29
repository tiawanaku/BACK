'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id         : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'LA PAZ',
    latitud    : -16.4973,
    longitud   : -68.1361,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : 'de60d23c-3609-44ee-9ac0-9e2c75601704',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'COCHABAMBA',
    latitud    : -17.3919,
    longitud   : -66.1617,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : '305be394-cdb4-4c15-ae52-eeb0d88c4854',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'ORURO',
    latitud    : -17.9604,
    longitud   : -67.1141,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : 'd6bed80d-df3e-4b54-bede-fe9125149314',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'POTOSÍ',
    latitud    : -19.5842,
    longitud   : -65.7512,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : '9213e0fa-1f15-4c84-880f-923e8aa9341d',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'TARIJA',
    latitud    : -21.5319,
    longitud   : -64.7374,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'SANTA CRUZ',
    latitud    : -17.7748,
    longitud   : -63.1879,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : 'a1632771-1294-4931-97df-19136e495d34',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'BENI',
    latitud    : -14.8338,
    longitud   : -64.9022,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : '069e1acc-fbd3-4f60-9ec7-2ad58b308126',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'PANDO',
    latitud    : -11.0221,
    longitud   : -68.7589,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
  },
  {
    id         : '75988c46-f652-4a80-8583-05431ac1105a',
    codigo_ine : null,
    nivel      : 2,
    nombre     : 'CHUQUISACA',
    latitud    : -19.0482,
    longitud   : -65.2622,
    id_padre   : 'da235029-17a3-4943-9c5b-0eeeeb0511fe'
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
