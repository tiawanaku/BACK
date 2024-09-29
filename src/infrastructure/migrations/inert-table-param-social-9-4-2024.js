'use strict';

const { sys_parametro } = require('./jsonParams/sys_parametro_slims.js');

const {
    setTimestampsSeeder
  } = require('../lib/util');
  
  const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up (queryInterface, Sequelize) {
      let items = [];
      for (let z = 0; z < sys_parametro.length; z++) {
        const elm = sys_parametro[z];
        items.push({
            id: uuidv4(),
            grupo: elm.grupo+'_SLIM',
            codigo: elm.codigo,
            nombre: elm.nombre,
            descripcion: elm.descripcion,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      items = setTimestampsSeeder(items);
      await queryInterface.bulkInsert('sys_parametro', items, {});
    },
    down (queryInterface, Sequelize) {}
};