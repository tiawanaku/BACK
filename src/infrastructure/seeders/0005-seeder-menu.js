'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  { id: '6190597f-7fa6-4c39-bcc9-7a1441ba566a', nombre: 'Dashboard', ruta: 'dashboard', icono: 'dashboard', orden: 10, id_menu: null, estado: 'ACTIVO'  },
  { id: '039a897a-76dd-44c1-b3d7-9682df8f5342', nombre: 'Entidades', ruta: 'entidades', icono: 'business', orden: 20, id_menu: null, estado: 'ACTIVO'  },
  { id: 'be20da7b-4805-4cf9-81a2-5908ca42ef9b', nombre: 'Denuncias', ruta: 'denuncias', icono: 'gavel', orden: 21, id_menu: null, estado: 'ACTIVO'  },
  { id: '2ef22159-d1e2-4a17-ad9c-7fb827df399e', nombre: 'Procesos', ruta: 'procesos', icono: 'settings_applications', orden: 30, id_menu: null, estado: 'ACTIVO'  },
  { id: '61d6d53b-ac65-41ac-bc54-3228f548f40a', nombre: 'Roles', ruta: 'roles', icono: 'group', orden: 40, id_menu: null, estado: 'ACTIVO'  },
  { id: 'ef6b99d0-0834-4d1e-86b0-207111744f98', nombre: 'Menus', ruta: 'menus', icono: 'menu', orden: 50, id_menu: null, estado: 'ACTIVO'  },
  { id: '6dc27435-bb49-48c8-b98d-ed9024d10ec5', nombre: 'Usuarios', ruta: 'usuarios', icono: 'people', orden: 60, id_menu: null, estado: 'ACTIVO'  },
  { id: 'a0882ff9-0d95-4d60-835d-85624f7a3469', nombre: 'Parametros', ruta: 'parametros', icono: 'settings', orden: 70, id_menu: null, estado: 'ACTIVO'  }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_menu', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
