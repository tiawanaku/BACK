'use strict';

const { items } = require('./delitoConclusionSlim/delito.js');

const {
    setTimestampsSeeder
} = require('../lib/util');
  
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up (queryInterface, Sequelize) {
      let item = [];
      for (let z = 0; z < items.length; z++) {
        const elm = items[z];
        item.push({
            id: uuidv4(),
            grupo: 'DELITO_GAMEA_SLIM',
            codigo: elm.codigo,
            nombre: elm.nombre,
            descripcion: elm.nombre,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
          });
      }
      item = setTimestampsSeeder(item);
      await queryInterface.bulkInsert('sys_parametro', item, {});
    },
    down (queryInterface, Sequelize) {}
};