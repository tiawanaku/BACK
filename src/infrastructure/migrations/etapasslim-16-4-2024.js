'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');

let etapa = [
    {
        nombre:'PATROCINIO',
        codigo:'EP'
    },
    {
        nombre:'TRABAJO SOCIAL',
        codigo:'ET'
    },
    {
        nombre:'ORIENTACIÓN',
        codigo:'EO'
    },
    {
        nombre:'PSICOLOGÍA',
        codigo:'EPS'
    }
];

let etapaProcesal = [
    {
        nombre:'PRELIMINAR ',
        codigo:'PRE'
    },
    {
        nombre:'RECHAZO CON OBJECIÓN',
        codigo:'RECH'
    },
    {
        nombre:'RECHAZO SIN OBJECION',
        codigo:'RECHS'
    },
    {
        nombre:'PREPARATORIA - IMPUTACION',
        codigo:'PRE-IMP'
    },
    {
        nombre:'SOBRESEIMIENTO CON IMPUGNACIÓN',
        codigo:'SOB'
    },
    {
        nombre:'SOBRESEIMIENTO SIN IMPUGNACIÓN',
        codigo:'SOSB'
    },
    {
        nombre:'ACUSACIÓN',
        codigo:'AC'
    },
    {
        nombre:'JUICIO ORAL',
        codigo:'JUI'
    },
    {
        nombre:'SENTENCIA ABSOLUTORIA',
        codigo:'SEN'
    },
    {
        nombre:'SENTENCIA CONDENATORIA',
        codigo:'SENC'
    },
    {
        nombre:'SENTENCIA MIXTA',
        codigo:'SENM'
    },
    {
        nombre:'RECURSOS',
        codigo:'REC'
    },
    {
        nombre:'EJECUCION',
        codigo:'EJ'
    },
];

const usoHabitacion = [
    'CASA',
    'DEPARTAMENTO',
    'DORMITORIO',
    'HABITACIONES O CUARTOS',
    'GARZONIER',
    'MONOAMBIENTE',
    'CONSTRUCCIÓN IMPROVISADA PROVISIONAL',
    'MULTIPLE'
];

module.exports = {
    async up (queryInterface, Sequelize) {
      
      let setItems = [];
      for (let z = 0; z < etapa.length; z++) {
        const elm = etapa[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'ETAPA_CASO_SLIM',
            codigo: elm.codigo,
            nombre: elm.nombre,
            descripcion: elm.nombre,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < etapaProcesal.length; z++) {
        const elm = etapaProcesal[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'ETAPA_PROCESAL_SLIM',
            codigo: elm.codigo,
            nombre: elm.nombre,
            descripcion: elm.nombre,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < usoHabitacion.length; z++) {
        const elm = usoHabitacion[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'USO_HABITACION_SLIM',
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