'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  { id: '7f5b3565-b270-4c16-b957-1b1ac3aaa04d', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'usuarios:crear', descripcion: 'Permiso para crear usuarios por entidad', estado: 'ACTIVO' },
  { id: 'e73a95a7-7eb6-4b73-bea1-8bd551e71093', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'usuarios:listar', descripcion: 'Permiso para leer usuarios por entidad', estado: 'ACTIVO' },
  { id: '0fba0566-6db3-4e65-984d-e42a945a12d2', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'usuarios:actualizar', descripcion: 'Permiso para actualizar usuarios por entidad', estado: 'ACTIVO' },
  { id: '0c1289e5-1870-4135-8217-0e2ec2b75e81', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'usuarios:eliminar', descripcion: 'Permiso para eliminar usuarios por entidad', estado: 'ACTIVO' },
  { id: '6e3f26a6-e681-4304-8fcb-2e0b6b269ce7', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'menus:listar', descripcion: 'Permiso para listar menus', estado: 'ACTIVO' },
  { id: 'f1d548ae-7a9d-4159-aace-48a00b997299', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'menus:crear', descripcion: 'Permiso para crear menus', estado: 'ACTIVO' },
  { id: '8b83d19d-563c-43a8-b073-131d0256ee9f', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'menus:actualizar', descripcion: 'Permiso para actualizar menus', estado: 'ACTIVO' },
  { id: '6dbe5edc-7075-4554-8f8f-ec33081c8fe8', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'menus:eliminar', descripcion: 'Permiso para eliminar menus', estado: 'ACTIVO' },
  { id: '86f561eb-4c3c-445d-a460-bd7646323b3d', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'roles:listar', descripcion: 'Permiso para listar roles', estado: 'ACTIVO' },
  { id: '0a0d00d4-5deb-4fd9-b8bd-02f526f1a3eb', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'roles:crear', descripcion: 'Permiso para crear roles', estado: 'ACTIVO' },
  { id: '76d904bd-ee07-4732-b5df-0d9bd9efb744', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'roles:actualizar', descripcion: 'Permiso para actualizar roles', estado: 'ACTIVO' },
  { id: '0afc4b37-1594-44e1-98d7-c9f47dd2672c', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'roles:eliminar', descripcion: 'Permiso para eliminar roles', estado: 'ACTIVO' },
  { id: 'bcfed14e-2405-4e25-ac63-61e348e1c2c0', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'permisos:listar', descripcion: 'Permiso para listar permisos', estado: 'ACTIVO' },
  { id: '15ff0e86-45f5-4b84-88ff-77461bccf7bc', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'permisos:crear', descripcion: 'Permiso para crear permisos', estado: 'ACTIVO' },
  { id: '9b764e5c-7f65-4cfc-9741-b84d47ebfeb3', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'permisos:actualizar', descripcion: 'Permiso para actualizar permisos', estado: 'ACTIVO' },
  { id: 'fb2aca8a-6257-4ef1-a435-5ed131d702f9', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'permisos:eliminar', descripcion: 'Permiso para eliminar permisos', estado: 'ACTIVO' },
  { id: '22067709-ce42-4926-89e6-8ce2dc52e193', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'entidades:listar', descripcion: 'Permiso para listar entidades', estado: 'ACTIVO' },
  { id: '5a064635-3084-42c5-ab38-d74588932b3c', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'entidades:listarpor', descripcion: 'Permiso para listar entidad por id', estado: 'ACTIVO' },
  { id: 'a6aec23e-bdbf-4cf7-a97e-fceb3a0c782d', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'entidades:crear', descripcion: 'Permiso para crear entidade', estado: 'ACTIVO' },
  { id: '56c2756b-63c4-4c1f-bf1d-d3b5c604eca6', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'entidades:actualizar', descripcion: 'Permiso para actualizar entidade', estado: 'ACTIVO' },
  { id: '3ee48c68-fb87-4a22-a4cc-47ce4b2bc6c6', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'entidades:eliminar', descripcion: 'Permiso para eliminar entidade', estado: 'ACTIVO' },
  { id: '743d712b-4904-489f-92ee-6ae6e9f6b1d7', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'formulario:listar', descripcion: 'Permiso para listar formularios', estado: 'ACTIVO' },
  { id: 'b0b7e8be-0a7a-4ef9-bf16-bc9f1a687867', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'formulario:listarpor', descripcion: 'Permiso para listar formulario por id', estado: 'ACTIVO' },
  { id: '959800a3-b744-4ffe-99e6-afaf33eb3ad3', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'formulario:crear', descripcion: 'Permiso para crear formulario', estado: 'ACTIVO' },
  { id: '4cef1f8f-0672-46eb-aaf9-1bf6bb19af4b', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'formulario:actualizar', descripcion: 'Permiso para actualizar formulario', estado: 'ACTIVO' },
  { id: 'cd2e8e5a-11b1-4f38-ae5c-b0858e6461ec', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'formulario:eliminar', descripcion: 'Permiso para eliminar formulario', estado: 'ACTIVO' },
  { id: '4c6baaa4-2bb4-42ca-a487-ddf2da1b052a', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'componente:listar', descripcion: 'Permiso para listar componentes', estado: 'ACTIVO' },
  { id: 'c7e71c1d-aae4-4384-9b12-c5312a1bf32d', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'componente:listarpor', descripcion: 'Permiso para listar componente por id', estado: 'ACTIVO' },
  { id: 'cb921d03-a8ed-46d1-8cfa-7f881bba0c17', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'componente:crear', descripcion: 'Permiso para crear componente', estado: 'ACTIVO' },
  { id: '69467c92-06e4-4cb5-8e81-a8d7fb9faab8', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'componente:actualizar', descripcion: 'Permiso para actualizar componente', estado: 'ACTIVO' },
  { id: '62fff69d-a5a7-46a9-928f-8db80fb2ff53', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'componente:eliminar', descripcion: 'Permiso para eliminar componente', estado: 'ACTIVO' },

  { id: '6bf6c07f-ab1c-46be-9465-659879ce330a', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'listar:todo', descripcion: 'Permiso para eliminar componente', estado: 'ACTIVO' },
  { id: 'e4c3cbc2-3944-4e11-84aa-ab54e44c4626', otros: null, id_padre: null, grupo: 'SISTEMA', nombre: 'denuncia:reasignar', descripcion: 'Permiso para eliminar componente', estado: 'ACTIVO' },

  // PERMISOS DE DENUNCIAS
  { id: '9a9cb996-7a57-4f77-a1d2-117582af1a67', otros: null, id_padre: null, grupo: 'DENUNCIA', nombre: 'JURIDICA', descripcion: 'Permiso para administrar denuncias juridicas', estado: 'ACTIVO' },
  { id: '039ecc84-1ad2-423b-b403-3239ebb43538', otros: null, id_padre: null, grupo: 'DENUNCIA', nombre: 'GESTADO', descripcion: 'Permiso para administrar denuncias gestado', estado: 'ACTIVO' },
  { id: 'b71a356e-593e-4705-ac32-915b6843414c', otros: null, id_padre: null, grupo: 'DENUNCIA', nombre: 'SIFEM', descripcion: 'Permiso para administrar denuncias sifem', estado: 'ACTIVO' },
  { id: '3b440112-e27d-498b-b490-2417aab73936', otros: null, id_padre: null, grupo: 'DENUNCIA', nombre: 'SP', descripcion: 'Permiso para administrar denuncias sp', estado: 'ACTIVO' }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_permiso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
