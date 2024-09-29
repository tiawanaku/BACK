'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id            : 'd859832d-7cc1-428b-978f-6f7f8b63a5e7',
    id_proceso    : '0113b3c4-3d24-4f4a-955d-76a49e01fb95',
    id_formulario : 'fea55f25-ad63-469e-bdb4-4857bc79979e'
  },
  {
    id            : '39282904-a07f-462c-a252-60b708b9d445',
    id_proceso    : '0113b3c4-3d24-4f4a-955d-76a49e01fb95',
    id_formulario : 'de91b64a-6e00-4e77-b582-a0f40739b261'
  },
  {
    id            : 'cc0ff906-f3a7-40bb-a070-1e16c4c01959',
    id_proceso    : '5a640583-e3d6-4450-be03-be205283d308',
    id_formulario : 'e1694b3b-a6be-4cab-b4e5-9d7f516a3f97'
  },
  {
    id            : '7c101cf4-0c03-4ff3-998a-83b825251482',
    id_proceso    : '5a640583-e3d6-4450-be03-be205283d308',
    id_formulario : 'de91b64a-6e00-4e77-b582-a0f40739b261'
  }
];
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('formulario_proceso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
