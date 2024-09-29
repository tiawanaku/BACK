'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');

const { elalto } = require('./zonas/zonaselalto.js');

module.exports = {
    async up (queryInterface, Sequelize) {
      
      let setItems = [];
      elalto.sort((a, b) => {
        if (a.calle < b.calle) {
          return -1;
        }
        if (a.calle > b.calle) {
          return 1;
        }
        return 0;
      });
      for (let z = 0; z < elalto.length; z++) {
        const elm = elalto[z].calle;
        setItems.push({
            id: uuidv4(),
            grupo: 'ZONA_GAMEA',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '0a190c5a-c5b7-47d1-9bad-faef5f8689d2'
        });
      }
      setItems = setTimestampsSeeder(setItems);
      await queryInterface.bulkInsert('sys_parametro', setItems, {});
    },
    down (queryInterface, Sequelize) {}
};