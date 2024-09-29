'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  { id: '0113b3c4-3d24-4f4a-955d-76a49e01fb95', configuracion: '[{"etapas": [], "nombre": "REGISTRADO"}, {"etapas": [], "nombre": "ASIGNADO"}, {"etapas": [], "nombre": "REASIGNADO"}, {"etapas": [], "nombre": "MODIFICADO"}, {"etapas": [{"nombre": "PRELIMINAR"}, {"nombre": "PREPARATORIA"}, {"nombre": "JUICIO ORAL"}, {"nombre": "RECURSOS"}, {"nombre": "EJECUTORIA"}], "nombre": "SEGUIMIENTO"}, {"etapas": [], "nombre": "ESTADO RECHAZADO"}, {"etapas": [], "nombre": "CERRADO"}, {"etapas": [], "nombre": "REABIERTO"}]', secuencia: 0, sigla: 'DJ', nombre: 'DENUNCIA JURIDICA', descripcion: 'Tipo de denuncia juridica' },
  { id: '7d98dd0d-740f-4025-ae80-07bfed39e627', configuracion: '[{"etapas": [], "nombre": "REGISTRADO"}, {"etapas": [], "nombre": "ASIGNADO"}, {"etapas": [], "nombre": "REASIGNADO"}, {"etapas": [], "nombre": "MODIFICADO"}, {"etapas": [{"nombre": "PRELIMINAR"}, {"nombre": "PREPARATORIA"}, {"nombre": "JUICIO ORAL"}, {"nombre": "RECURSOS"}, {"nombre": "EJECUTORIA"}], "nombre": "SEGUIMIENTO"}, {"etapas": [], "nombre": "ESTADO RECHAZADO"}, {"etapas": [], "nombre": "CERRADO"}, {"etapas": [], "nombre": "REABIERTO"}]', secuencia: 0, sigla: 'SP', nombre: 'SP', descripcion: 'Tipo de denuncia juridica' },
  { id: '5a640583-e3d6-4450-be03-be205283d308', configuracion: '[{"etapas": [], "nombre": "REGISTRADO"}, {"etapas": [], "nombre": "ASIGNADO"}, {"etapas": [], "nombre": "REASIGNADO"}, {"etapas": [], "nombre": "MODIFICADO"}, {"etapas": [{"nombre": "PRELIMINAR"}, {"nombre": "PREPARATORIA"}, {"nombre": "JUICIO ORAL"}, {"nombre": "RECURSOS"}, {"nombre": "EJECUTORIA"}], "nombre": "SEGUIMIENTO"}, {"etapas": [], "nombre": "ESTADO RECHAZADO"}, {"etapas": [], "nombre": "CERRADO"}, {"etapas": [], "nombre": "REABIERTO"}]', secuencia: 0, sigla: 'SIF', nombre: 'SIFEM', descripcion: 'Tipo de denuncia juridica' },
  { id: '2a0e1150-adca-40ed-85ce-6c9918170378', configuracion: '[{"etapas": [], "nombre": "REGISTRADO"}, {"etapas": [], "nombre": "ASIGNADO"}, {"etapas": [], "nombre": "REASIGNADO"}, {"etapas": [], "nombre": "MODIFICADO"}, {"etapas": [{"nombre": "PRELIMINAR"}, {"nombre": "PREPARATORIA"}, {"nombre": "JUICIO ORAL"}, {"nombre": "RECURSOS"}, {"nombre": "EJECUTORIA"}], "nombre": "SEGUIMIENTO"}, {"etapas": [], "nombre": "ESTADO RECHAZADO"}, {"etapas": [], "nombre": "CERRADO"}, {"etapas": [], "nombre": "REABIERTO"}]', secuencia: 0, sigla: 'GE', nombre: 'GESTADO', descripcion: 'Tipo de denuncia juridica' }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('proceso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
