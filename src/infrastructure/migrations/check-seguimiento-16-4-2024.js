'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');


const preliminarDefensoria = [
    'Informe psicológico',
    'Registro del lugar del hecho',
    'Informe social',
    'Certificado médico forense',
    'Certificado médico emitido por cualquier centro de salud',
    'Reconocimiento de personas (desfile identificativo)'
];

const preliminarSlim = [
    'Informe psicológico',
    'Registro del lugar del hecho',
    'Informe social',
    'Certificado médico forense',
    'Certificado médico emitido por cualquier centro de salud',
    'Reconocimiento de personas (desfile identificativo)'
];

const preparatoriaDefensoria = [
    'Inspección Técnica Ocular',
    'Declaración de Testigos',
    'Pericia Psicológica',
    'Pericia Biológica',
    'Pericia Genética',
    'Pericia Toxicológica',
    'Pericia Informática',
    'Anticipo de Prueba',
    'Declaración Víctima'
];

const preparatoriaSlim = [
    'Inspección Técnica Ocular',
    'Declaración de Testigos',
    'Pericia Psicológica',
    'Pericia Biológica',
    'Pericia Genética',
    'Pericia Toxicológica',
    'Pericia Informática',
    'Anticipo de Prueba',
    'Declaración Víctima'
];

module.exports = {
    async up (queryInterface, Sequelize) {
      let setItems = [];
      for (let z = 0; z < preliminarSlim.length; z++) {
        const elm = preliminarSlim[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'CHECK_PRELIMINAR_SLIM',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < preliminarDefensoria.length; z++) {
        const elm = preliminarDefensoria[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'CHECK_PRELIMINAR_DEFENSORIA',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '0a190c5a-c5b7-47d1-9bad-faef5f8689d2'
        });
      }
      for (let z = 0; z < preparatoriaSlim.length; z++) {
        const elm = preparatoriaSlim[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'CHECK_PREPARATORIA_SLIM',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < preparatoriaDefensoria.length; z++) {
        const elm = preparatoriaDefensoria[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'CHECK_PREPARATORIA_DEFENSORIA',
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