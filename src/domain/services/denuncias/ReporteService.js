'use strict';

const { ErrorApp } = require('../../lib/error');
module.exports = function rolService (repositories, helpers, res) {
  const { ReporteRepository } = repositories;

  async function priorizadosPorcentaje (params = {}) {
    try {
      const resultado = await ReporteRepository.priorizadosPorcentaje(params);
      return resultado;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    priorizadosPorcentaje
  };
};
