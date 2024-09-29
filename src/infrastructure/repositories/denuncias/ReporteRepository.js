'use strict';

module.exports = function accionRepository (models, Sequelize) {
  const { denuncia } = models;

  async function priorizadosPorcentaje (filtros) {
    let queryFiltros = '';

    if (filtros.departamento) {
      queryFiltros += ` AND d.lugar_hecho = '${filtros.departamento}'`;
    }

    if (filtros.fechaInicio || filtros.fechaFin) {
      queryFiltros += ` AND d.fecha_denuncia >= '${filtros.fechaInicio || '1900-12-30'}' AND d.fecha_denuncia <= '${filtros.fechaFin || '2200-12-31'}'`;
    }

    const query = `
      SELECT 
        d.denominacion, 
        s.estado_denuncia, 
        s.etapa_denuncia,
        s.actuacion,
        coalesce(p.monto, 0) AS monto,
        coalesce(CASE 
          WHEN s.etapa_denuncia = 'PRELIMINAR' THEN 15
          WHEN s.etapa_denuncia = 'PREPARATORIA' THEN 40
          WHEN s.etapa_denuncia ILIKE '%JUICIO%' THEN 80
          WHEN s.etapa_denuncia ILIKE '%SENTENCIA%' THEN 100
        END, 0) AS porcentaje
      FROM denuncia d
      LEFT JOIN (
        SELECT id_denuncia, SUM(estimacion_monetaria) AS monto
        FROM participante as p 
        WHERE _deleted_at IS NULL
        GROUP BY id_denuncia
      ) p ON d.id = p.id_denuncia
      INNER JOIN seguimiento s ON s.id_denuncia = d.id AND s.etapa_denuncia NOT IN 
      ('REASIGNADO', 'REGISTRADO', 'SEGUIMIENTO', 'ASIGNADO', 'EJECUTORIA', 'RECURSO - APELACIÓN RESTRINGIDA', 'RECURSO - CASACIÓN')
      INNER JOIN (
        SELECT id_denuncia, MAX(fecha_actuacion) AS fecha_actuacion
        FROM seguimiento s 
        WHERE etapa_denuncia NOT IN ('REASIGNADO', 'REGISTRADO', 'SEGUIMIENTO', 'ASIGNADO', 'EJECUTORIA', 'RECURSO - APELACIÓN RESTRINGIDA', 'RECURSO - CASACIÓN')
        GROUP BY id_denuncia 
      ) ultimo ON d.id = ultimo.id_denuncia AND s.fecha_actuacion = ultimo.fecha_actuacion
      WHERE d.id_tipo_proceso IN ('7d98dd0d-740f-4025-ae80-07bfed39e627', '9b49b99c-01ea-47d7-bd8a-42d46d8dc530') AND prioritario = TRUE ${queryFiltros}
      ORDER BY d.denominacion
    `;

    const respuesta = await denuncia.options.sequelize.query(query);
    return respuesta[0];
  }

  return {
    priorizadosPorcentaje
  };
};
