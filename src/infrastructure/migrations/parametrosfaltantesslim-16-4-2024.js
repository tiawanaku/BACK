'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');


const medidacautelar = [
    'Fianza juratoria consiste en la promesa del imputado de someterse al procedimiento y no obstaculizar la investigación',
    'Obligación de presentarse ante el juez o ante la autoridad que designe',
    'Obligación de someterse al cuidado o vigilancia de una persona o institución determinada, en las condiciones que fije la jueza, el juez o tribunal',
    'Prohibición de concurrir a determinados lugares',
    'Prohibición de comunicarse con personas determinadas',
    'Fianza personal o económica. La fianza económica podrá ser prestada por el imputado o por otra persona mediante depósito de dinero',
    'Vigilancia del imputado mediante algún dispositivo electrónico de vigilancia, rastreo o posicionamiento de su ubicación física, sin costo para este',
    'Prohibición de salir del país o del ámbito territorial que se determine, sin autorización judicial previa, a cuyo efecto se ordenará su arraigo a las autoridades competentes',
    'Detención domiciliaria en su propio domicilio o en el de otra persona, sin vigilancia o con la que determine la jueza, el juez o tribunal. Si el imputado no puede proveer a sus necesidades económicas o a las de su familia, la jueza, el juez o tribunal podrá autorizar que se ausente durante la jornada laboral',
    'Detención preventiva únicamente en los casos permitidos por este Código'
];

const presento = [
    'SI',
    'NO'
];

const penal = [
    'CHONCHOCORO',
    'SAN PEDRO'
];

module.exports = {
    async up (queryInterface, Sequelize) {
      
      let setItems = [];
      for (let z = 0; z < medidacautelar.length; z++) {
        const elm = medidacautelar[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'MEDIDA_CAUTELAR_SLIM',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < presento.length; z++) {
        const elm = presento[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'PRESENTO_SLIM',
            codigo: elm.charAt(0),
            nombre: elm,
            descripcion: elm,
            orden: z,
            id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < penal.length; z++) {
        const elm = penal[z];
        setItems.push({
            id: uuidv4(),
            grupo: 'PENAL_GAMEA_SLIM',
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