'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');

//REFERENCIA----------------------------

let formadeingreso =
[
  'Personal',
  'Familiar',
  'Por terceros',
  'Por derivación',
];

let violenciaFisica =
[
  'Empujones, rasguños, mordeduras y pellizcos',
  'Golpes (puñetes, patadas, etc..)',
  'Lesiones en la cabeza, en el rostro y perdida de cabello',
  'Hematomas multiples en el cuerpo',
  'Heridas cortantes',
  'Fracturas',
  'Asfixia',
  'Quemaduras',
  'Maniatadas',
];


let violenciaPsicologica =
[
  'Amenazas, calumnias, prohibiciones',
  'Insultos, humillaciones',
  'Celos, infidelidades, indiferencia',
  'Inducir a conductas autodestructivas',
  'Destrucción depertenencias',
  'Negar ayuda médica',
  'Situación de control, persecuciones-acoso',
  'Sentimiento de culpa, ansiedad',
  'Incumplimiento de promesas',
  'Agresión a animales domésticos',
  'Manipulacón de hijos/as',
  'No reconocimiento de hijos',
  'Desalojo de vivienda'
];


let violSexual =
[
  'Obligara a practicar actos sexuales bajo intimidación y amenzas',
  'Obligar a ver oeliculas o revistas pornográficas',
  'Daño en los genitales'
];

let delPenales =
[
  'Tentativa de violación',
  'Violación en estado de inconsciencia',
  'Tentativa de Homicidio',
  'Bigamia',
  'Aborto provocado',
  'Simulación de matrimonio',
  'Abandono de mujer embarazada',
  'Abandono de familia',
  'Incumplimiento de deberes de Asistencia',
  'Lesiones garvisimas',
  'Lesiones leves y graves',
  'Contagio venereo (VIH/SIDA/ETS)',
];

let lugarAgresion =
[
  'Mismo lugar que la dirección actual de la víctima',
  'Ambito privado',
  'Ambito público',
];

//VICTIMA AGRESOR-------------------------------

let opcionesCi =
[
  'C.I',
  'RUN',
  'Certificado de Nacimiento',
  'No Tiene'
];

let opcionesSexo =
[
  'Femenino',
  'Masculino'
];

let opcionesNacimiento =
[
  'En este Municipio',
  'Otro Municipio',
  'Otro País'
];

let opcionesEstadoCivil =
[
  'Soltera (o)',
  'Casada (o)',
  'Concubina (o) -Unión Libre',
  'Divorciada (o)',
  'Separada (o)',
  'Viuda (o)'
];

let opcionesRelacionAgresor =
[
  'Esposo (a)',
  'Concubino (a) -Unión Libre',
  'Enamorado (a)',
  'Ex- Esposo (a)',
  'Ex-Concubino (a)',
  'Ex-Enamorado (a)',
  'Progenitores',
  'Hijos (as)',
  'Hermanos (as)',
  'Abuelos (as)',
  'Tios (as)',
  'Nietos (as)',
  'Cuñados (as)',
  'Suegros  (as)',
  'Nueras Yernos',
  'Primos (as)',
  'Sobrinos (as)'
];

let opcionesLogroEducativo =
[
  'Ninguno',
  'Lee y escribe',
  'Primaria',
  'Secundaria',
  'Técnico',
  'Superior',
  'Otro'
];

let condicionesDeActividad =
[
  'Trabaja',
  'No Trabaja',
  'Jubilado/a',
  'Estudiante',
  'Labores de casa',
  'Otro'
];

let opcionesIngresoEconomico =
[
  'No tiene',
  'Diario',
  'Semanal',
  'Mensual'
];

let opcionesIdiomaHablado =
[
  'Castellano',
  'Quechua',
  'Aymara',
  'Extranjero',
  'Otro'
];

module.exports = {
    async up (queryInterface, Sequelize) {
      let setItems = [];
      for (let z = 0; z < formadeingreso.length; z++) {
        const elm = formadeingreso[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'FORMA_INGRESO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < violenciaFisica.length; z++) {
        const elm = violenciaFisica[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'VIOLENCIA_FISICA_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < violenciaPsicologica.length; z++) {
        const elm = violenciaPsicologica[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'VIOLENCIA_PSICOLOGICA_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < violSexual.length; z++) {
        const elm = violSexual[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'VIOLENCIA_SEXUAL_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < delPenales.length; z++) {
        const elm = delPenales[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'DELITO_PENAL_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < lugarAgresion.length; z++) {
        const elm = lugarAgresion[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'LUGAR_AGRESION_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesCi.length; z++) {
        const elm = opcionesCi[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'DOCUMENTO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesSexo.length; z++) {
        const elm = opcionesSexo[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'SEXO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesNacimiento.length; z++) {
        const elm = opcionesNacimiento[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'NACIMIENTO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesEstadoCivil.length; z++) {
        const elm = opcionesEstadoCivil[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'ESTADO_CIVIL_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesRelacionAgresor.length; z++) {
        const elm = opcionesRelacionAgresor[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'RELACION_AGRESOR_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesLogroEducativo.length; z++) {
        const elm = opcionesLogroEducativo[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'LOGRO_EDUCATIVO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < condicionesDeActividad.length; z++) {
        const elm = condicionesDeActividad[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'CONDICIONES_ACTIVIDAD_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesIngresoEconomico.length; z++) {
        const elm = opcionesIngresoEconomico[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'INGRESO_ECONÓMICO_SLIM_GAMEA',
          codigo: elm.charAt(0),
          nombre: elm,
          descripcion: elm,
          orden: z,
          id_proceso: '1e00fe13-1c41-4219-873b-6771bf1836e4'
        });
      }
      for (let z = 0; z < opcionesIdiomaHablado.length; z++) {
        const elm = opcionesIdiomaHablado[z];
        setItems.push({
          id: uuidv4(),
          grupo: 'IDIOMA_SLIM_GAMEA',
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