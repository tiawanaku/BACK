'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

const { v4: uuidv4 } = require('uuid');

let items = {
    "DNA":[
     {
      "Column2": "TIPOLOGÍA "
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 1,
      "Column2": "ASISTENCIA FAMILIAR"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 2,
      "Column2": "SUSPENSION DE LA AUTORIDAD MATERNA, PATERNA O DE AMBOS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 3,
      "Column2": "EXTINCION DE LA AUTORIDAD MATERNA, PATERNA O DE AMBOS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 4,
      "Column2": "EXTINCION DE LA AUTORIDAD MATERNA, PATERNA O DE AMBOS POR RENUNCIAPARA ADOPCION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 5,
      "Column2": "GUARDA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 6,
      "Column2": "TUTELA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 7,
      "Column2": "ABANDONO DE NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 8,
      "Column2": "EXTRAVIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 9,
      "Column2": "IMPOSIBILIDAD DE DEBERES POR CAUSA AJENA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 10,
      "Column2": "ORFANDAD ABSOLUTA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 11,
      "Column2": "ACOGIMIENTO CIRCUNSTANCIAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 12,
      "Column2": "AUSENCIA DE RECONOCIMIENTO DE FILIACION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 13,
      "Column2": "FILIACION JUDICIAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 14,
      "Column2": "NACIONALIDAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 15,
      "Column2": "VIOLENCIA FISICA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 16,
      "Column2": "VIOLENCIA PSICOLOGICA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 17,
      "Column2": "VIOLENCIA EN EL SISTEMA EDUCATIVO (PARES Y NO PARES, BULLING,CIBERBULLING, ETC, NO EXCLUYENTE EN OTRAS TIPOLOGIAS)"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 18,
      "Column2": "SOMETIMIENTO A CASTIGO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 19,
      "Column2": "ABANDONO EMOCIONAL O PSICO-AFECTIVO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 20,
      "Column2": "FALTA DE PROVISION ADECUADA Y OPORTUNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 21,
      "Column2": "UTILIZACION DE NNA EN CONFLICTOS FAMILIARES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 22,
      "Column2": "UTILIZACION DE NNA EN MEDIDAS DE HECHO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 23,
      "Column2": "INDUCCION A NNA AL CONSUMO DE SUBSTANCIAS DANIÑAS A SU SALUD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 24,
      "Column2": "TRASLADO Y RETENCION ARBITRARIA DE NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 25,
      "Column2": "RESTITUCION NACIONAL E INTERNACIONAL DE NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 26,
      "Column2": "EXIGENCIA DE ACTIVIDADES EN LA FAMILIA QUE PONGAN EN RIESGO A NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 27,
      "Column2": "VULNERACION A LA LIBERTAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 28,
      "Column2": "VULNERACION A LA PRIVACIDAD E INTIMIDAD FAMILIAR"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 29,
      "Column2": "VULNERACION A LA IMAGEN Y CONFIDENCIALIDAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 30,
      "Column2": "PROTECCION CONTRA LA VIOLENCIA SEXUAL (SEXUALIZACION PRECOZ O HIPERSEXUALIZACION)"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 31,
      "Column2": "TRABAJOS PROHIBIDOS Y ATENTATORIOS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 32,
      "Column2": "EXPLOTACION LABORAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 33,
      "Column2": "PROTECCION LABORAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 34,
      "Column2": "INFRACCION AL DERECHO DE PROTECCION EN RELACION EL TRABAJO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 35,
      "Column2": "EXPULSION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 36,
      "Column2": "RESTRICCION A LA EDUCACION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 37,
      "Column2": "RESTRICCION A LA SALUD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 38,
      "Column2": "ADOLESCENTE CON RESPONSABILIDAD PENAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 39,
      "Column2": "RESTRICCION A LIBERTAD DE EXPRESION A LA LIBRE PARTICIPACION Y A LA POSIBILIDAD DE INTERPONER PETICION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 40,
      "Column2": "VULNERACION DE LOS DERECHOS Y GARANTIAS DE LOS NNA, CON MADRE O PADRE PRIVADOS DE LIBERTAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 41,
      "Column2": "RESTRICCION DE LOS DERECHOS DE LOS NNA EN SITUACION DE DISCAPACIDAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 42,
      "Column2": "RESTRICCION AL DERECHO A LA RECREACION, ESPARCIMIENTO, DEPORTE Y JUEGO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 43,
      "Column2": "CONDUCTA AGRESIVAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 44,
      "Column2": "CONSUMO DE ALCOHOL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 45,
      "Column2": "CONSUMO DE DROGAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 46,
      "Column2": "PARTICIPACION EN PANDILLAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 47,
      "Column2": "INTENTO DE SUICIDIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 48,
      "Column2": "ABANDONO DE HOGAR"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 49,
      "Column2": "ABANDONO ESCOLAR"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 50,
      "Column2": "SEXTING"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 51,
      "Column2": "ORIENTACION Y\/O APOYO INTEGRAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 52,
      "Column2": "VIOLACION INFANTE O NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 53,
      "Column2": "ABUSO SEXUAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 54,
      "Column2": "ESTUPRO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 55,
      "Column2": "RAPTO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 56,
      "Column2": "CORRUPCION DE NNA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 57,
      "Column2": "CORRUPCION AGRAVADA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 58,
      "Column2": "PADECIMIENTO SEXUALES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 59,
      "Column2": "ACOSO SEXUAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 60,
      "Column2": "PROXENITISMO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 61,
      "Column2": "VIOLENCIA SEXUAL COMERCIAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 62,
      "Column2": "HOMICIDIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 63,
      "Column2": "HOMICIDIO EN PRACTICAS DEPORTIVAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 64,
      "Column2": "ASESINATO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 65,
      "Column2": "HOMICIDIO SUICIDIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 66,
      "Column2": "INFANTICIDIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 67,
      "Column2": "ABORTO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 68,
      "Column2": "HOMICIDIO EN RIÑA O A CONSECUENCIA DE AGRESION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 69,
      "Column2": "ABORTO SEGUIDO DE LESION O MUERTE"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 70,
      "Column2": "HOMICIDIO Y LESIONES GRAVES Y GRAVISIMAS EN ACCIDENTE DE TRANSITO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 71,
      "Column2": "ABORTO HONORIS CAUSA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 72,
      "Column2": "ABORTO PRETERINTENCIONAL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 73,
      "Column2": "ABORTO CULPOSO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 74,
      "Column2": "LESIONES GRAVISIMAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 75,
      "Column2": "LESIONES GRAVES Y LEVES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 76,
      "Column2": "LESIONES GRAVISIMAS OCASIONADAS POR ANIMALES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 77,
      "Column2": "ESTERILIZACION FORZADA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 78,
      "Column2": "VIOLENCIA FAMILIAR Y DOMESTICA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 79,
      "Column2": "LESION SEGUIDA DE MUERTE"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 80,
      "Column2": "LESIONES CULPOSAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 81,
      "Column2": "CONTAGIO DE ENFERMEDADES DE TRANSMISION SEXUAL O VIH SIDA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 82,
      "Column2": "ALTERACION GENETICA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 83,
      "Column2": "ABANDONO DE NIÑAS O NIÑOS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 84,
      "Column2": "DENEGACION DE AUXILIO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 85,
      "Column2": "DISCRIMINACION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 86,
      "Column2": "DIFUSION E INCITACION AL RACISMO O A LA DISCRIMINACION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 87,
      "Column2": "ORGANIZACIONES O ASOCIACIONES RACISTAS O DISCRIMINATORIAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 88,
      "Column2": "INSULTOS Y OTRAS AGRESIONES VERBALES POR MOTIVOS RACISTAS O DISCRIMINATORIOS."
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 89,
      "Column2": "DIFAMACION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 90,
      "Column2": "CALUMNIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 91,
      "Column2": "PROPALACION DE OFENSA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 92,
      "Column2": "INJURIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 93,
      "Column2": "REDUCCION A LA ESCLAVITUD O ESTADO ANALOGO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 94,
      "Column2": "SECUESTRO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 95,
      "Column2": "PRIVACION DE LIBERTAD"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 96,
      "Column2": "AMENAZAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 97,
      "Column2": "COACCION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 98,
      "Column2": "VEJACIONES Y TORTURAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 99,
      "Column2": "ATENTADO CONTRA LA LIBERTAD DE ENSEÑANZA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 100,
      "Column2": "ATENTADO CONTRA LA LIBERTAD DE TRABAJO"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 101,
      "Column2": "ALTERACION O SUSTITUCION DEL ESTADO CIVIL"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 102,
      "Column2": "SUSTRACCION DE UN MENOR O INCAPAZ"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 103,
      "Column2": "INDUCCION DE FUGA DE UN NNA O JURIDICAMENTE INCAPAZ"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 104,
      "Column2": "ABANDONO DE FAMILIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 105,
      "Column2": "INCUMPLIMIENTO DE DEBERES DE ASISTENCIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 106,
      "Column2": "ABANDONO DE MUJER EMBARAZADA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 107,
      "Column2": "EXTORCION"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 108,
      "Column2": "ENGAÑO A PERSONAS INCAPACES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 109,
      "Column2": "TENTATIVA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 110,
      "Column2": "TRATA DE PERSONAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 111,
      "Column2": "TRAFICO DE PERSONAS"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 112,
      "Column2": "PORNOGRAFIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 113,
      "Column2": "REVELACION DE IDENTIDAD DE VICTIMAS, TESTIGOS O DENUNCIANTES"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 114,
      "Column2": "OMISION DE DENUNCIA"
     },
     {
      "DEFENSORIA DE LA NIÑEZ Y ADOLESCENCIA": 115,
      "Column2": "FEMINICIDIO"
     }
    ],
    "SLIM":[
     {
      "Column2": "TIPOLOGIA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 1,
      "Column2": "VIOLENCIA FÍSICA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 2,
      "Column2": "FEMINICIDIO"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 3,
      "Column2": "REQUERIMIENTOS FISCALES O JUDICIALES"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 4,
      "Column2": "VIOLENCIA PSICOLÓGICA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 5,
      "Column2": "VIOLENCIA MEDIÁTICA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 6,
      "Column2": "ASISTENCIA FAMILIAR"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 7,
      "Column2": "VIOLENCIA SIMBÓLICA Y\/O ENCUBIERTA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 8,
      "Column2": "VIOLENCIA CONTRA LA DIGNIDAD, LA HONRA Y EL NOMBRE"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 9,
      "Column2": "VIOLENCIA SEXUAL"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 10,
      "Column2": "VIOLENCIA CONTRA LOS DERECHOS  REPRODUCTIVOS"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 11,
      "Column2": "VIOLENCIA EN SERVICIOS DE SALUD"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 12,
      "Column2": "VIOLENCIA PATRIMONIAL Y ECONÓMICA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 13,
      "Column2": "VIOLENCIA LABORAL"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 14,
      "Column2": "VIOLENCIA EN EL SISTEMA EDUCATIVO PLURINACIONAL"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 15,
      "Column2": "VIOLENCIA EN EL EJERCICIO POLÍTICO Y DE LIDERAZGO DE LA MUJER"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 16,
      "Column2": "ABANDONO DE HOGAR"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 17,
      "Column2": "VIOLENCIA INSTITUCIONAL"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 18,
      "Column2": "VIOLENCIA FISICA EN LA FAMILIA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 19,
      "Column2": "VIOLENCIA PSICOLOGICA EN LA FAMILIA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 20,
      "Column2": "VIOLENCIA SEXUAL EN LA FAMILIA"
     },
     {
      "SERVICIOS LEGALES INTEGRALES MUNICIPALES": 21,
      "Column2": "VIOLENCIA CONTRA LOS DERECHOS Y LA LIBERTAD  SEXUAL"
     }
]}

module.exports = {
    async up (queryInterface, Sequelize) {
      
      let setItemsDefensoria = [];
      let setItemsSlim = [];
      for (let z = 0; z < items.DNA.length; z++) {
        const elm = items.DNA[z];
        setItemsDefensoria.push({
            id: uuidv4(),
            grupo: 'TIPOLOGIA_DEFENSORIA_GAMEA',
            codigo: elm.Column2.charAt(0),
            nombre: elm.Column2,
            descripcion: elm.Column2,
            orden: z,
            id_proceso: '0a190c5a-c5b7-47d1-9bad-faef5f8689d2'
        });
      }

      for (let z = 0; z < items.SLIM.length; z++) {
        const elm = items.SLIM[z];
        setItemsSlim.push({
            id: uuidv4(),
            grupo: 'TIPOLOGIA_SLIM_GAMEA',
            codigo: elm.Column2.charAt(0),
            nombre: elm.Column2,
            descripcion: elm.Column2,
            orden: z,
            id_proceso: '0a190c5a-c5b7-47d1-9bad-faef5f8689d2'
        });
      }
      setItemsDefensoria = setTimestampsSeeder(setItemsDefensoria);
      setItemsSlim = setTimestampsSeeder(setItemsSlim);
      await queryInterface.bulkInsert('sys_parametro', setItemsDefensoria, {});
      await queryInterface.bulkInsert('sys_parametro', setItemsSlim, {});
    },
    down (queryInterface, Sequelize) {}
};