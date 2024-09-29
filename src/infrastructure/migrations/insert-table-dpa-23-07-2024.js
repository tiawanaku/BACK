'use strict';

const { elalto } = require('./zonas/zonaselalto.js');

const {
    setTimestampsSeeder
  } = require('../lib/util.js');
  
  const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up (queryInterface, Sequelize) {
      let items = [];
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
        const elm = elalto[z];
        items.push({
            id: uuidv4(),
            id_padre: '907d698c-32b0-4b85-8cbf-1b39a309c92f',
            nivel: 5,
            nombre: elm.calle,
            latitud: elm.latitud,
            longitud: elm.longitud
        });
      }
      items = setTimestampsSeeder(items);
      await queryInterface.bulkInsert('sys_dpa', items, {});
    },
    down (queryInterface, Sequelize) {}
};