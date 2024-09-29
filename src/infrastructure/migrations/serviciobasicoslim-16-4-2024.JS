'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');


const usoHabitacion = [
    'LUZ',
    'AGUA POTABLE',
    'ALCANTARILLADO',
    'GAS DOMICILIARIO',
    'TELÉFONO',
    'INTERNET',
    'NINGUNO'
];

module.exports = {
    async up (queryInterface, Sequelize) {
      
      let setItems = [];
      for (let z = 0; z < usoHabitacion.length; z++) {
        const elm = usoHabitacion[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'SERVICIO_BASICO_GAMEA_SLIM',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      setItems = setTimestampsSeeder(setItems);
      await queryInterface.bulkInsert('sys_parametro', setItems, {});
    },
    down (queryInterface, Sequelize) {}
};