'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  { id: '40c3ddc2-e839-451d-95c9-a259ea781751', id_proceso: null, grupo: 'CONFIG', codigo: 'TK', nombre: 'TIEMPO DEL TOKEN', descripcion: '240', estado: 'ACTIVO' },

  // Tipo de documento
  { id: '7f295982-6e6c-4424-b1f5-26c2dd21d5f2', id_proceso: null, grupo: 'TIPO_DOCUMENTO', codigo: 'CIEXT', nombre: 'CEDULA DE IDENTIDAD DE EXTRANJERO', estado: 'ACTIVO' },
  { id: '1d1866c6-4cc6-4957-a308-8638b8560355', id_proceso: null, grupo: 'TIPO_DOCUMENTO', codigo: 'CI', nombre: 'CEDULA DE IDENTIDAD', estado: 'ACTIVO' },
  { id: '37f9091a-86ee-4431-97b5-4e97917d14c6', id_proceso: null, grupo: 'TIPO_DOCUMENTO', codigo: 'PAS', nombre: 'PASAPORTE', estado: 'ACTIVO' },
  { id: '112e1cde-0ac1-465a-aa5e-64d7e2f6ae42', id_proceso: null, grupo: 'TIPO_DOCUMENTO', codigo: 'NIT', nombre: 'NUMERO DE IDENTIFICACION TRIBUTARIO', estado: 'ACTIVO' },
  { id: '83cf2636-ce74-4ef4-ab17-04c68d8fd89c', id_proceso: null, grupo: 'TIPO_DOCUMENTO', codigo: 'NITE', nombre: 'NUMERO DE IDENTIFICACION TRIBUTARIA EXTRANJERA', estado: 'ACTIVO' },

  { id: '99693b34-e7a7-4429-88e3-2ed0066bc5c2', id_proceso: null, grupo: 'GENERO', codigo: 'M', nombre: 'MASCULINO', estado: 'ACTIVO' },
  { id: 'a077342f-5d2d-4e77-a949-c415345d2450', id_proceso: null, grupo: 'GENERO', codigo: 'F', nombre: 'FEMENINO', estado: 'ACTIVO' },

  { id: 'e791430e-07eb-4eb7-9588-df16c2706871', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'DENUNCIA', codigo: 'L004', nombre: 'Ley 004 - Art 26 uso indebido de vienes  y servicios publicos', estado: 'ACTIVO' },
  { id: 'a02101d2-2324-4b47-9593-817f683ae6bc', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'DENUNCIA', codigo: 'L0042', nombre: 'Ley 004 - Art 33 Falsedad en la declaracion jurada de bienes y rentas', estado: 'ACTIVO' },

  { id: 'f7dcefe2-979b-4201-a7f6-7dc9a00c50d4', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'DENUNCIA', codigo: 'L004', nombre: 'Ley 004 - Art 26 uso indebido de vienes  y servicios publicos', estado: 'ACTIVO' },
  { id: '91aa4655-90f9-44db-930f-3701daeb687d', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'DENUNCIA', codigo: 'L0042', nombre: 'Ley 004 - Art 33 Falsedad en la declaracion jurada de bienes y rentas', estado: 'ACTIVO' },

  { id: 'a044459d-ba7a-448c-acf5-dac8e2ffb388', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'TIPO_PARTICIPANTE', codigo: 'DNT', nombre: 'DENUNCIANTE', estado: 'ACTIVO' },
  { id: '00f7ba7a-6954-4fa9-95dd-7a38e2409c5d', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'TIPO_PARTICIPANTE', codigo: 'DND', nombre: 'DENUNCIADO', estado: 'ACTIVO' },
  { id: '5f0d1aaa-498f-4ad2-96d3-3f7349526475', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'TIPO_PARTICIPANTE', codigo: 'VC', nombre: 'VICTIMA', estado: 'ACTIVO' },

  { id: 'e9c133dd-d053-4fb1-8821-0f04e30d03e0', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'TIPO_PARTICIPANTE', codigo: 'DNT', nombre: 'DENUNCIANTE', estado: 'ACTIVO' },

  { id: '8a16e356-bf95-4182-bed6-f3d551b8087a', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'ETAPA', codigo: 'PRE-J', nombre: 'PRELIMINAR', estado: 'ACTIVO' },
  { id: '4d888af5-fdd4-4d78-9a22-54d37f6a7650', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'ETAPA', codigo: 'PREPA-J', nombre: 'PREPARATORIA', estado: 'ACTIVO' },
  { id: '2ed2053e-94c6-4678-849a-46090241ea51', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'ETAPA', codigo: 'JUO-J', nombre: 'JUICIO ORAL', estado: 'ACTIVO' },
  { id: '7a4ee8c6-d61c-4c7b-9a9c-86afe6e81051', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'ETAPA', codigo: 'REC-J', nombre: 'RECURSOS', estado: 'ACTIVO' },
  { id: '4a6f75bf-b0a7-4217-ab9b-2a2b0c2cff81', id_proceso: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', grupo: 'ETAPA', codigo: 'EJEC-J', nombre: 'EJECUTORIA', estado: 'ACTIVO' },

  { id: '6627f3af-09d5-43a7-9630-fa0c39b3b306', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'ETAPA', codigo: 'PRE-S', nombre: 'PRELIMINAR', estado: 'ACTIVO' },
  { id: 'b4633b4b-514a-4095-9604-78c049c090fb', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'ETAPA', codigo: 'PREPA-S', nombre: 'PREPARATORIA', estado: 'ACTIVO' },
  { id: 'b9908b04-8365-4222-a828-102e295edf5d', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'ETAPA', codigo: 'JUO-S', nombre: 'JUICIO ORAL', estado: 'ACTIVO' },
  { id: 'f0e99931-f07c-452c-8256-f94a34bbdf51', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'ETAPA', codigo: 'REC-S', nombre: 'RECURSOS', estado: 'ACTIVO' },
  { id: '097a4334-40ac-41f8-b515-27bd82d929de', id_proceso: '7d98dd0d-740f-4025-ae80-07bfed39e627', grupo: 'ETAPA', codigo: 'EJEC-S', nombre: 'EJECUTORIA', estado: 'ACTIVO' },

  { id: 'fd0ec583-11e3-419c-a490-6d4b513303b9', id_proceso: '2a0e1150-adca-40ed-85ce-6c9918170378', grupo: 'ETAPA', codigo: 'PRE-G', nombre: 'PRELIMINAR', estado: 'ACTIVO' },
  { id: '66668aa4-41f9-4915-8773-4d77fd4a45d4', id_proceso: '2a0e1150-adca-40ed-85ce-6c9918170378', grupo: 'ETAPA', codigo: 'PREPA-G', nombre: 'PREPARATORIA', estado: 'ACTIVO' },
  { id: '219b1687-98c4-4ddd-baef-dba6be096fbc', id_proceso: '2a0e1150-adca-40ed-85ce-6c9918170378', grupo: 'ETAPA', codigo: 'JUO-G', nombre: 'JUICIO ORAL', estado: 'ACTIVO' },
  { id: '9689146c-5851-4817-bcba-ca90b9fee9c3', id_proceso: '2a0e1150-adca-40ed-85ce-6c9918170378', grupo: 'ETAPA', codigo: 'REC-G', nombre: 'RECURSOS', estado: 'ACTIVO' },
  { id: 'aa0b14bd-5982-40e0-b4c3-47bdfb66e3e4', id_proceso: '2a0e1150-adca-40ed-85ce-6c9918170378', grupo: 'ETAPA', codigo: 'EJEC-G', nombre: 'EJECUTORIA', estado: 'ACTIVO' },

  { id: '04148758-3846-426f-a6cb-91d461c0fdf2', id_proceso: '5a640583-e3d6-4450-be03-be205283d308', grupo: 'ETAPA', codigo: 'PRE-F', nombre: 'PRELIMINAR', estado: 'ACTIVO' },
  { id: '303c995b-c8ac-4559-b094-5bb698fabacc', id_proceso: '5a640583-e3d6-4450-be03-be205283d308', grupo: 'ETAPA', codigo: 'PREPA-F', nombre: 'PREPARATORIA', estado: 'ACTIVO' },
  { id: '1ccaf595-01da-400d-8395-8446f05e4c24', id_proceso: '5a640583-e3d6-4450-be03-be205283d308', grupo: 'ETAPA', codigo: 'JUO-F', nombre: 'JUICIO ORAL', estado: 'ACTIVO' },
  { id: 'f1787664-0aa2-4572-aaf7-c5a56f0c8926', id_proceso: '5a640583-e3d6-4450-be03-be205283d308', grupo: 'ETAPA', codigo: 'REC-F', nombre: 'RECURSOS', estado: 'ACTIVO' },
  { id: 'fc018ae9-40df-4cf3-81b9-c95ca90694a5', id_proceso: '5a640583-e3d6-4450-be03-be205283d308', grupo: 'ETAPA', codigo: 'EJEC-F', nombre: 'EJECUTORIA', estado: 'ACTIVO' }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_parametro', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
