'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');
const { TIPOPROCESO, REPORTEEXCEL } = require('../../../common/config/constants');

module.exports = function parametroService (repositories, helpers, res) {
  const { ParametroRepository } = repositories;

  async function findAll (params) {
    try {
      const parametros = await ParametroRepository.findAll(params);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const parametro = await ParametroRepository.findOne(params);
      return parametro;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const parametros = await ParametroRepository.createOrUpdate(datos);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function eliminar (params) {
    try {
      const parametros = await ParametroRepository.deleteItemCond(params);
      return parametros;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findIds (params) {
    try {
      const { IDPROCESODEFENSORIA, IDPROCESOSLIM } = TIPOPROCESO;
      const { ORIENTACION, PATROCINIO, PSICOLOGIA, SOCIAL } = REPORTEEXCEL;
      let data = {};
      if (params.idProceso == IDPROCESODEFENSORIA) {
        const { rows } = await ParametroRepository.findAll({grupo: 'ETAPA_PROCESAL_GAMEA', idProceso: IDPROCESODEFENSORIA});
        // const { rows: etapas } = await ParametroRepository.findAll({grupo: 'ETAPA_CASO', idProceso: IDPROCESODEFENSORIA});
        for (let z = 0; z < rows.length; z++) {
          const elm = rows[z];
          switch (elm.codigo) {
            case 'PRE':
              data.preliminarId = elm.id
            break;
            case 'RECH':
              data.rechazoObjecionId = elm.id
            break;
            case 'PRE-IMP':
              data.preparatoriaImputacionId = elm.id
            break;
            case 'SOB':
              data.sobreseimientoImpugnacionId = elm.id
            break;
            case 'SOSB':
              data.sobreseimientoSinImpugnacionId = elm.id
            break;
            case 'AC':
              data.acusacionId = elm.id
            break;
            case 'JUI':
              data.juicioOralId = elm.id
            break;
            case 'SEN':
              data.sentenciaAbsolutoriaId = elm.id
            break;
            case 'SENM':
              data.sentenciaMixtaId = elm.id
            break;
            case 'REC':
              data.recursoId = elm.id
            break;
            case 'EJ':
              data.ejecucionId = elm.id
            break;
            case 'RECHS':
              data.rechazoSinObjecionId = elm.id
            break;
            case 'SENC':
              data.sentenciaCondenatoriaId = elm.id
            break;
            default:
            break;
          }
        }
        /* for (let z = 0; z < etapas.length; z++) {
          const elm = etapas[z];
          switch (elm.codigo) {
            case 'EO':
              data.orientacionId = elm.nombre
            break;
            case 'ET':
              data.socialId = elm.nombre
            break;
            case 'EPS':
              data.psicologiaId = elm.nombre
            break;
            case 'EP':
              data.patrocinioId = elm.nombre
            break;
            default:
            break;
          }
        } */
      } else if (params.idProceso == IDPROCESOSLIM) {
        const { rows } = await ParametroRepository.findAll({grupo: 'ETAPA_PROCESAL_SLIM', idProceso: IDPROCESOSLIM});
        const { rows: etapas } = await ParametroRepository.findAll({grupo: 'ETAPA_CASO_SLIM', idProceso: IDPROCESOSLIM});
        for (let z = 0; z < rows.length; z++) {
          const elm = rows[z];
          switch (elm.codigo) {
            case 'PRE':
              data.preliminarId = elm.id
            break;
            case 'RECH':
              data.rechazoObjecionId = elm.id
            break;
            case 'PRE-IMP':
              data.preparatoriaImputacionId = elm.id
            break;
            case 'SOB':
              data.sobreseimientoImpugnacionId = elm.id
            break;
            case 'SOSB':
              data.sobreseimientoSinImpugnacionId = elm.id
            break;
            case 'AC':
              data.acusacionId = elm.id
            break;
            case 'JUI':
              data.juicioOralId = elm.id
            break;
            case 'SEN':
              data.sentenciaAbsolutoriaId = elm.id
            break;
            case 'SENM':
              data.sentenciaMixtaId = elm.id
            break;
            case 'REC':
              data.recursoId = elm.id
            break;
            case 'EJ':
              data.ejecucionId = elm.id
            break;
            case 'RECHS':
              data.rechazoSinObjecionId = elm.id
            break;
            case 'SENC':
              data.sentenciaCondenatoriaId = elm.id
            break;
            default:
            break;
          }
        }
        /* for (let z = 0; z < etapas.length; z++) {
          const elm = etapas[z];
          switch (elm.codigo) {
            case 'EO':
              data.orientacionId = elm.nombre
            break;
            case 'ET':
              data.socialId = elm.nombre
            break;
            case 'EPS':
              data.psicologiaId = elm.nombre
            break;
            case 'EP':
              data.patrocinioId = elm.nombre
            break;
            default:
            break;
          }
        } */
      }

      data.orientacionId = ORIENTACION;
      data.socialId = SOCIAL;
      data.psicologiaId = PSICOLOGIA;
      data.patrocinioId = PATROCINIO;
      
      return data;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    eliminar,
    findOne,
    createOrUpdate,
    findAll,
    findIds
  };
};
