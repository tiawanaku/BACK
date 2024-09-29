'use strict';

const { sys_parametro } = require('./jsonParams/sys_parametro.js');

module.exports = {
    async up (queryInterface, Sequelize) {
      const items = [];
      for (let z = 0; z < sys_parametro.length; z++) {
        const elm = sys_parametro[z];
        if (elm.id_proceso == null) items.push({...elm});
      }
      await queryInterface.bulkInsert('sys_parametro', items, {});
    },
    down (queryInterface, Sequelize) {}
};