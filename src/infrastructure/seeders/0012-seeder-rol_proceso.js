'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id         : 'd859832d-7cc1-428b-978f-6f7f8b63a5e7',
    id_proceso : '0113b3c4-3d24-4f4a-955d-76a49e01fb95',
    id_rol     : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a'
  },
  {
    id         : '1e6a360a-5700-4c8a-8f3a-ac75e34b9eb3',
    id_proceso : '7d98dd0d-740f-4025-ae80-07bfed39e627',
    id_rol     : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a'
  },
  {
    id         : 'c7873102-1cc2-42a3-9ad0-d4cca2a7c827',
    id_proceso : '5a640583-e3d6-4450-be03-be205283d308',
    id_rol     : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a'
  },
  {
    id         : '67ce490a-2f88-4401-8046-c8c98e67e22c',
    id_proceso : '2a0e1150-adca-40ed-85ce-6c9918170378',
    id_rol     : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a'
  }
];
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol_proceso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
