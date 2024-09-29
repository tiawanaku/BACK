'use strict';

const Repository = require('../Repository');

const { getQuery, toJSON } = require('../../lib/util');
const { ID_PROCESO_LGI, ID_DELITO_LGI, BIENES_CAUTELADOS, ID_TIPO_PARTICIPANTE_DENUNCIADO, SITUACION_JURIDICA, BIENES_DECOMISADOS, ID_DELITO_FT, BIENES_INCAUTADOS, BIENES_CONFISCADOS, TIPOPROCESO } = require('../../../common/config/constants');
const regexpV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

module.exports = function denunciaRepository (models, Sequelize) {
  const { denuncia,
    participante,
    Seguimiento,
    parametro,
    archivo,
    Proceso,
    usuario,
    entidad,
    bienesCautelados,
    DelitoPrecedente,
    grupoFamiliar,
    denunciaLlenadoRol,
    denunciaCheckPreliminar,
    denunciaCheckPreparatoria
  } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = { casoConcluido: false, etapaActual: { [Op.not]: 'CERRADO' } };
    query.distinct = true;

    const {IDPROCESODEFENSORIA, IDPROCESOSLIM} = TIPOPROCESO;

    query.attributes = [
      'codigoDenuncia',
      'createdAt',
      'deletedAt',
      'denominacion',
      'estado',
      'estadoActual',
      'etapaActual',
      'fechaIngreso',
      'fechaDenuncia',
      'fiscal',
      'id',
      'idTipoProceso',
      'idEtapaCaso',
      'idUsuarioAsignado',
      'juzgado',
      'lugarDenuncia',
      'lugarHecho',
      'numeroFiscalia',
      'nurej',
      'policia',
      'relacionHecho',
      'reservaIdentidad',
      'updatedAt',
      'userCreated',
      'userDeleted',
      'userUpdated',
      'etiquetas',
      'codigoSaj',
      'idEntidad',
      'casoConcluido',
      'idTipoConclusion',
      'justificacionCasoConcluido',
      'idCiudad',
      'idTipoConclusionHijo',
      'idTipologiaFamiliar',
      'idDivisa',
      'idUsoHabitacion',
      'idSaludAtencion',
      'idAntedecentesJudiciales',
      'fechaCitacion',
      'horaCitacion',
      'correlativoGamea',
      'nombreVictima',
      'documentoVictima',
      'nombreDenunciante',
      'documentoDenunciante',
      'nombreDenunciado',
      'documentoDenunciado',
      'reasonSlim',
      'reasonDefensoria',
      'asignacionAnterior',
      'idSlimDefensoria',
      'idDefensoria',
      'idSlim',
      'idZona',
      'idFormaIngresoSlim',
      'idLugarAgresion',
      'anterioridadOtraInstitucion',
      [Sequelize.literal('(SELECT FALSE)'), 'showParticipantes']
    ];

    /* let whereRol = {};
    if (params.idRol) {
      whereRol.idRol = params.idRol;
    } */

    query.include = [
      {
        attributes : ['id', 'numero_documento', 'nombre_razon_social', 'idTipoParticipante', 'nombreCompleto'],
        model      : participante,
        as         : 'participantes'
      },
      {
        model      : grupoFamiliar,
        as         : 'denunciaGrupoFamiliar'
      },
      {
        attributes : ['id_tipo_bien', 'descripcion'],
        model      : bienesCautelados,
        as         : 'bienesCautelados'
      },
      {
        model : Proceso,
        as    : 'proceso'
      },
      {
        required : false,
        model    : usuario,
        as       : 'usuarioAsignado'
      },
      {
        through    : { attributes: [] },
        attributes : [],
        model      : entidad,
        as         : 'entidades'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipoConclusion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'ciudad'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipoConclusionHijo'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipologiaFamiliar'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'divisa'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'usoHabitacion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'saludAtencion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'antedecentesJudiciales'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'etapaCaso'
      },
      {
        attributes : ['id', 'tipo_seguimiento', 'actuacion', 'nombre_etapa_rol', 'fecha_inicio', 'fecha_fin', 'se_atendio'],
        model      : Seguimiento,
        as         : 'seguimiento',
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'slimDefensoria'
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'defensoria'
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'slim'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'zona'
      }
    ];

    /* let whereDefensoria = {};
    let whereSlim = {} */

    if (params.casoConcluido) {
      /* delete query.where.casoConcluido;
      delete query.where.etapaActual; */
      query.where.casoConcluido = params.casoConcluido;
    };

    if (params.misCasos) {
      query.where.idUsuarioAsignado = params.misCasos;
      // query.where.userCreated = params.misCasos;
    };
    
    if (params.defensorias && IDPROCESODEFENSORIA == params.idTipoProceso) {
      if (Array.isArray(params.defensorias)) query.where.idDefensoria = { [Op.in]: params.defensorias };
    };

    if (params.slims && IDPROCESOSLIM == params.idTipoProceso) {
      if (Array.isArray(params.slims)) query.where.idSlim = { [Op.in]: params.slims };
    };


    if (params.busquedaAvanzada) {
      params.busquedaAvanzada = JSON.parse(params.busquedaAvanzada);
    };

    if (params.busquedaAvanzada) {
      const arrayOr = { [Op.or]: [] };
      if (params.denominacion) {
        arrayOr[Op.or].push({
          denominacion: {
            [Op.iLike]: `%${params.denominacion}%`
          }
        });
      }

      if (params.relacionHecho) {
        arrayOr[Op.or].push({
          relacionHecho: {
            [Op.iLike]: `%${params.relacionHecho}%`
          }
        });
      }

      if (params.etapaActual) {
        arrayOr[Op.or].push({
          etapaActual: {
            [Op.iLike]: `%${params.etapaActual}%`
          }
        });
      }

      if (params.lugarHecho) {
        arrayOr[Op.or].push({
          lugarHecho: {
            [Op.iLike]: `%${params.lugarHecho}%`
          }
        });
      }

      if (params.codigoDenuncia) {
        arrayOr[Op.or].push({
          codigoDenuncia: {
            [Op.iLike]: `%${params.codigoDenuncia}%`
          }
        });
      }

      /* if (params.nombrePartes) {
        arrayOr[Op.or].push(Sequelize.literal(`(SELECT STRING_AGG(nombre_razon_social, ', ') FROM participante p WHERE p.id_denuncia = denuncia.id)
        ILIKE '%${params.nombrePartes}%'`));
      }

      if (params.numeroDocumentoPartes) {
        arrayOr[Op.or].push(Sequelize.literal(`(SELECT STRING_AGG(numero_documento, ', ') FROM participante p WHERE p.id_denuncia = denuncia.id)
        ILIKE '%${params.numeroDocumentoPartes}%'`));
      } */

      if (params.codigoSaj) {
        arrayOr[Op.or].push({
          codigoSaj: {
            [Op.iLike]: `%${params.codigoSaj}%`
          }
        });
      }

      if (params.correlativoGamea) {
        arrayOr[Op.or].push({
          correlativoGamea: {
            [Op.iLike]: `%${params.correlativoGamea}%`
          }
        });
      }

      if (params.nombreVictima) {
        arrayOr[Op.or].push({
          nombreVictima: {
            [Op.iLike]: `%${params.nombreVictima}%`
          }
        });
      }

      if (params.documentoVictima) {
        arrayOr[Op.or].push({
          documentoVictima: {
            [Op.iLike]: `%${params.documentoVictima}%`
          }
        });
      }

      if (params.nombreDenunciante) {
        arrayOr[Op.or].push({
          nombreDenunciante: {
            [Op.iLike]: `%${params.nombreDenunciante}%`
          }
        });
      }

      if (params.documentoDenunciante) {
        arrayOr[Op.or].push({
          documentoDenunciante: {
            [Op.iLike]: `%${params.documentoDenunciante}%`
          }
        });
      }

      if (params.nombreDenunciado) {
        arrayOr[Op.or].push({
          nombreDenunciado: {
            [Op.iLike]: `%${params.nombreDenunciado}%`
          }
        });
      }

      if (params.documentoDenunciado) {
        arrayOr[Op.or].push({
          documentoDenunciado: {
            [Op.iLike]: `%${params.documentoDenunciado}%`
          }
        });
      }

      if (arrayOr[Op.or].length > 0) {
        if (params.idTipoProceso) {
          if (Array.isArray(params.idTipoProceso)) {
            query.where = {
              [Op.and]: {
                idTipoProceso: {
                  [Op.in]: params.idTipoProceso
                },
                ...arrayOr
              }
            };
          } else {
            query.where = {
              [Op.and]: {
                idTipoProceso: params.idTipoProceso,
                ...arrayOr
              }
            };
          }
        } else {
          query.where = arrayOr;
        }
      } else {
        if (params.idTipoProceso) {
          query.where.idTipoProceso = params.idTipoProceso;
        }
      }
    } else {
      if (params.estadoActual) {
        query.where.estadoActual = params.estadoActual;
      }

      if (params.etapaActual) {
        query.where.etapaActual = params.etapaActual;
      }

      if (params.idUsuarioAsignado) {
        query.where.idUsuarioAsignado = params.idUsuarioAsignado;
      }

      if (params.idTipoProceso) {
        if (Array.isArray(params.idTipoProceso)) {
          query.where.idTipoProceso = {
            [Op.in]: params.idTipoProceso
          };
        } else {
          query.where.idTipoProceso = params.idTipoProceso;
        }
      }

      if (params.lugarHecho) {
        query.where.lugarHecho = params.lugarHecho;
      }

      if (params.codigoDenuncia) {
        query.where.codigoDenuncia = {
          [Op.iLike]: `%${params.codigoDenuncia}%`
        };
      };
    }
    
    const result = await denuncia.findAndCountAll(query);
    return toJSON(result);
  }

  async function findByUUID (idDenuncia, t) {
    const query = {
      where: {
        id: idDenuncia
      }
    };

    query.order = [
      [{
        model : Seguimiento,
        as    : 'seguimiento'
      }, 'createdAt', 'DESC']
    ];

    query.include = [
      {
        through : { attributes: [] },
        model   : entidad,
        as      : 'entidades'
      },
      {
        model : Proceso,
        as    : 'proceso'
      },
      {
        model : usuario,
        as    : 'usuarioAsignado'
      },
      {
        model : participante,
        as    : 'participantes'
      },
      {
        model      : grupoFamiliar,
        as         : 'denunciaGrupoFamiliar'
      },
      {
        model   : bienesCautelados,
        as      : 'bienesCautelados',
        include : [
          {
            model : parametro,
            as    : 'tipoBien'
          }
        ]
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'delitos'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'servicioBasico'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'tipoVivienda'
      },
      {
        model   : Seguimiento,
        as      : 'seguimiento',
        include : [
          {
            model : usuario,
            as    : 'usuarioCreacion'
          },
          {
            model : archivo,
            as    : 'archivos'
          }
        ]
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipologiaFamiliar'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'divisa'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'usoHabitacion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'saludAtencion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'antedecentesJudiciales'
      },
      {
        model      : parametro,
        as         : 'miembroResponsable'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'slimDefensoria'
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'defensoria'
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'slim'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'zona'
      },
      {
        model      : parametro,
        as         : 'FormaIngresoSlim'
      },
      {
        model      : parametro,
        as         : 'lugarAgresion'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'delitoPenalSlim'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'violenciaFisica'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'violenciaPsicologica'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'violenciaSexual'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'checksPreliminar'
      },
      {
        through : { attributes: [] },
        model   : parametro,
        as      : 'checksPreparatoria'
      }
    ];

    if (t) {
      query.transaction = t;
    }

    const result = await denuncia.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  function formatQueryReport (params, key) {
    const from = 'FROM denuncia d';
    let where = `WHERE d._deleted_at IS NULL AND d.id_tipo_proceso = '${params.idTipoProceso}' AND d.caso_concluido = FALSE`;
    /* if (params.tipoDelito && key !== 'tipoDelito') {
      where += `\n\tAND d.tipo_delito ${params.tipoDelito === 'SIN REGISTRO' ? 'IS NULL' : "= '" + params.tipoDelito + "'"}`;
    } */
    if (params.etapa && key !== 'etapa') {
      where += `\n\tAND d.etapa_actual ${params.etapa === 'SIN SEGUIMIENTO' ? 'IS NULL' : "= '" + params.etapa + "'"}`;
    }

    if (params.ciudad && key !== 'ciudad') {
      where += `\n\tAND 
        d.id_ciudad IN (
          SELECT id
          FROM sys_parametro
          WHERE nombre = '${params.ciudad}'
        )
      `;
    }

    return [from, where];
  }

  async function reporteEtapa (params) {
    const [from, where] = formatQueryReport(params, 'etapa');
    const query = `
      SELECT COALESCE(d.etapa_actual, 'SIN SEGUIMIENTO') etapa_actual, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY COALESCE(d.etapa_actual, 'SIN SEGUIMIENTO')
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteDefensoria (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.descripcion as nombre, COUNT(sp.descripcion) AS total
      ${from}
      INNER JOIN sys_parametro sp ON d.id_defensoria = sp.id AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.descripcion
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteZona (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.nombre as nombre, COUNT(sp.nombre) AS total
      ${from}
      INNER JOIN sys_parametro sp ON d.id_zona = sp.id AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.nombre
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteSlim (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.descripcion as nombre, COUNT(sp.descripcion) AS total
      ${from}
      INNER JOIN sys_parametro sp ON d.id_slim = sp.id AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.descripcion
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteCiudad (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.nombre, COUNT(sp.nombre) AS total
      ${from}
      INNER JOIN sys_parametro sp ON d.id_ciudad = sp.id AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.nombre
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteBienCautelado (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.id, sp.nombre AS bien_cautelado, count(bc.*) as total
      ${from}
      INNER JOIN bienes_cautelados bc ON bc.id_denuncia = d.id AND bc._deleted_at IS NULL
      INNER JOIN sys_parametro sp ON bc.id_tipo_bien = sp.id AND sp._deleted_at IS NULL
      ${where} ANd sp.grupo = 'TIPO_BIEN'
      GROUP BY sp.id;
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteDelitoPrecendete (params) {
    const [from, where] = formatQueryReport(params);
    const query = `
      SELECT sp.id, sp.nombre AS delito_precedente, count(dp.*) as total
      ${from}
      INNER JOIN delito_precedente dp ON dp.id_denuncia = d.id AND dp._deleted_at IS NULL
      INNER JOIN sys_parametro sp ON dp.id_delito_precedente = sp.id AND sp._deleted_at IS NULL
      ${where} AND sp.grupo = 'DELITO_PRECEDENTE'
      GROUP BY sp.id;
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteRetencionFondos (params) {
    const [from, where] = formatQueryReport(params);

    const query = `
      SELECT sp.id, sp.nombre AS retencion_fondos,
      COALESCE(SUM(bc.valor_economico::FLOAT), 0) as total
      ${from}
      INNER JOIN bienes_cautelados AS bc on bc.id_denuncia = d.id AND bc._deleted_at IS NULL
      INNER JOIN sys_parametro AS sp ON bc.id_tipo_bien = sp.id AND sp.id IN ('7c81c0f0-b905-4067-9d31-88d0b1947176', '846d7d86-7821-4326-b21d-5611a7991afb')
       AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.id;
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteSituacionJuridica (params) {
    const [from, where] = formatQueryReport(params);

    const query = `
      SELECT sp.id, sp.nombre AS situacion_juridica, count(p.*) as total
      ${from}
      INNER JOIN participante as p ON p.id_denuncia = d.id AND p._deleted_at IS NULL
      INNER JOIN sys_parametro sp ON p.id_situacion_juridica  = sp.id AND sp._deleted_at IS NULL
      ${where} AND sp.grupo = 'CATEGORIA_DENUNCIADO'
      GROUP BY sp.id;
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }

  async function reporteMedidaCautelar (params) {
    const [from, where] = formatQueryReport(params);

    const query = `
      SELECT sp.id, sp.nombre AS medida_cautelar, count(p.*) as total
       ${from}
      INNER JOIN participante AS p ON p.id_denuncia = d.id AND p._deleted_at IS NULL
      INNER JOIN sys_parametro sp ON p.id_medida_cautelar = sp.id AND sp._deleted_at IS NULL
      ${where} AND sp.grupo = 'TIPO_IMPUTACION'
      GROUP BY sp.id;
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  

  async function reportesDenuncia (params) {
    const key = params.key;
    delete params.key;

    switch (key) {
      case 'etapa':
        return await reporteEtapa(params);
      case 'ciudad':
        return await reporteCiudad(params);
      case 'delitoPrecedente':
        return await reporteDelitoPrecendete(params);
      case 'bienCautelado':
        return await reporteBienCautelado(params);
      case 'retencionFondos':
        return await reporteRetencionFondos(params);
      case 'situacionJuridica':
        return await reporteSituacionJuridica(params);
      case 'medidaCautelar':
        return await reporteMedidaCautelar(params);
      /* case 'etiqueta':
        return await reporteEtiqueta(params);
      case 'rangoEtario':
        return await reporteRangoEtario(params); */
      case 'delito':
        return await delitos(params);
      case 'usuario':
        return await usuarios();
      case 'casosUsuario':
        return await casosUsuario(params);
      case 'defensoria':
        return await reporteDefensoria(params);
      case 'slim':
        return await reporteSlim(params);
      case 'zona':
        return await reporteZona(params);
      case 'conclusion':
        return await reporteConclusion(params);
      default:
        return null;
    }
  }

  async function reporteConclusion (params) {

    let where = '';
    if (params.idTipoProceso) {
      where += `\n\tAND d.id_tipo_proceso = '${params.idTipoProceso}'`
    }

    const query = `
      SELECT sp.nombre AS nombre,
      COUNT(d.id) AS total
      FROM denuncia d
      JOIN sys_parametro sp ON d.id_tipo_conclusion = sp.id
      WHERE d.caso_concluido = true AND d._deleted_at IS NULL
      ${where}
      GROUP BY sp.nombre
    `;

    const [results] = await denuncia.options.sequelize.query(query);
    
    return results || null;
    
  }


  async function delitos (params) {    
    const [from, where] = formatQueryReport(params);

    const query = `
      SELECT sp.nombre, COUNT(sp.nombre) AS total
      ${from}
      INNER JOIN denuncia_delito dd ON dd.id_denuncia = d.id AND dd._deleted_at IS NULL
      INNER JOIN sys_parametro sp ON sp.id = dd.id_parametro_delito AND sp._deleted_at IS NULL
      ${where}
      GROUP BY sp.nombre;
    `;
    const [results] = await denuncia.options.sequelize.query(query);

    return results || null;
    
  }

  async function usuarios () {    

    const query = `
      SELECT CONCAT(su.nombres, ' ',su.primer_apellido, ' ',su.segundo_apellido) AS nombre, COALESCE(contador, 0) AS total
      FROM sys_usuario su
      LEFT JOIN (
          SELECT d.id_usuario_asignado,  COUNT(*) AS contador
          FROM denuncia d
          GROUP BY d.id_usuario_asignado 
      ) AS denuncia ON su.id = denuncia.id_usuario_asignado
      where su._deleted_at is null and su.estado = 'ACTIVO';
    `;
    const [results] = await usuario.options.sequelize.query(query);

    return results || null;
    
  }

  async function casosUsuario (params) {
    let [from, where] = formatQueryReport(params);
    if (params.usuario) {
      where += `\n\tAND d.id_usuario_asignado IN (
        SELECT su.id
        FROM sys_usuario su
        WHERE CONCAT(su.nombres, ' ', su.primer_apellido, ' ', su.segundo_apellido) = '${params.usuario}')
      `
    }
    const query = `
      SELECT d.relacion_hecho AS nombre, COUNT(d.id_usuario_asignado) AS total
      ${from}
      ${where}
      \n\tAND d._deleted_at is null and d.estado = 'ACTIVO'
      GROUP BY nombre
    `;
    const [results] = await usuario.options.sequelize.query(query);

    return results || null;
    
  }

  function getFiltrosGenerales (params, filtros) {
    const filtrosConsulta = {
      filtroProceso                   : ` AND d.id_tipo_proceso = '${ID_PROCESO_LGI}'`,
      filtroDelito                    : params.idDelito ? ` AND dd.id_parametro_delito = '${params.idDelito}'` : '',
      filtroUsuarioAsignado           : filtros.idUsuarioAsignado ? ` AND d.id_usuario_asignado = '${filtros.idUsuarioAsignado}'` : '',
      filtroFechasDenuncia            : `AND d.fecha_denuncia >= '${filtros.fechaInicioDenuncia || '1900-12-30'}' AND d.fecha_denuncia <= '${filtros.fechaFinDenuncia || '2200-12-31'}'`,
      filtroFechasEtapa               : `AND sd.fecha_actuacion >= '${filtros.fechaInicioActuado || '1900-12-30'}' AND sd.fecha_actuacion <= '${filtros.fechaFinActuado || '2200-12-31'}'`,
      filtroDepartamento              : filtros.departamento ?  Array.isArray(filtros.departamento) ? ` AND d.lugar_hecho IN ('${filtros.departamento.join("','")}')` : ` AND d.lugar_hecho = '${filtros.departamento}'` : '',
      filtroCategoriaDelitoPrecedente : params.idCategoriaDelitoPrecedente ? ` AND dp.id_categoria_delito = '${params.idCategoriaDelitoPrecedente}'` : ''
    };

    return filtrosConsulta;
  }

  function getConsultaUltimoActuado (filtros) {
    const  query = `
      INNER JOIN seguimiento sd ON sd.id_denuncia = d.id AND sd._deleted_at IS NULL
      INNER JOIN (
        SELECT id_denuncia, MAX(_created_at) AS _created_at
        FROM seguimiento sd
        WHERE sd._deleted_at IS NULL ${filtros.filtroFechasEtapa}
        GROUP BY id_denuncia
      ) ultimo ON d.id = ultimo.id_denuncia AND sd._created_at = ultimo._created_at
    `;
    return query;
  }

  function getConsultaDelitoPrecedente ({ filtroProceso, filtroUsuarioAsignado, filtroDepartamento, filtroCategoriaDelitoPrecedente, filtroDelito, incluyeLGI = true }) {
    let query = `
      SELECT d.id, d.codigo_denuncia
      FROM denuncia as d
      ${incluyeLGI ? `INNER JOIN denuncia_delito dd ON d.id = dd.id_denuncia  ${filtroDelito}  AND dd._deleted_at IS NULL` : ''}
      LEFT JOIN delito_precedente as dp ON dp.id_denuncia = d.id AND dp._deleted_at IS NULL
      WHERE
        d._deleted_at IS NULL
        AND d.caso_concluido = FALSE
        AND d.etapa_actual != 'CERRADO'
        ${filtroProceso}
        ${filtroUsuarioAsignado}
        ${filtroDepartamento}
      GROUP BY d.id
      HAVING count(dp.*) = 0
    `;

    if (filtroCategoriaDelitoPrecedente) {
      query = `
        SELECT d.id, d.codigo_denuncia
        FROM denuncia as d
        ${incluyeLGI ? `INNER JOIN denuncia_delito dd ON d.id = dd.id_denuncia  ${filtroDelito}  AND dd._deleted_at IS NULL` : ''}
        LEFT JOIN delito_precedente as dp ON dp.id_denuncia = d.id AND dp._deleted_at IS NULL
        WHERE
          d._deleted_at IS NULL
          AND d.caso_concluido = FALSE
          AND d.etapa_actual != 'CERRADO'
          ${filtroProceso}
          ${filtroCategoriaDelitoPrecedente}
          ${filtroUsuarioAsignado}
        GROUP BY d.id
      `;
    }

    return query;
  }

  function getSubConsultaTipoDenuncia (idDelito) {
    return `INNER JOIN (
          SELECT DISTINCT(d.id) AS id_denuncia
          FROM denuncia as d
          INNER JOIN denuncia_delito as dd ON d.id = dd.id_denuncia AND dd.id_parametro_delito = '${idDelito}' AND dd._deleted_at IS NULL
          WHERE  d.id_tipo_proceso = '${ID_PROCESO_LGI}' AND d.caso_concluido = FALSE AND d.etapa_actual != 'CERRADO'
        ) tipo_denuncia ON d.id = tipo_denuncia.id_denuncia`;
  }

  function getSubConsultaCategoriaDelitoPrecedente (idCategoriaDelitoPrecedente) {
    return `
        INNER JOIN (rte
            SELECT DISTINCT(d.id) AS id_denuncia
            FROM denuncia as d
            INNER JOIN delito_precedente as dp ON d.id = dp.id_denuncia AND dp.id_categoria_delito = '${idCategoriaDelitoPrecedente}' AND dp._deleted_at IS NULL
            WHERE  d.id_tipo_proceso = '${ID_PROCESO_LGI}' AND d.caso_concluido = FALSE AND d.etapa_actual != 'CERRADO'
        ) tipo_delito_precedente ON d.id = tipo_delito_precedente.id_denuncia
      `;
  }

  async function reporteAvanzadoDelitos (params, filtros) {
    function getConsulta (params, filtros) {
      const idTipoParticipanteDenunciado = '4ae54d6b-8abb-4c33-9a7c-832dc12e4e02';
      const filtrosConsulta = getFiltrosGenerales(params, filtros);

      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);

      let subQueryTipoDenuncia = '';

      if (params.idDelito) {
        subQueryTipoDenuncia = `
        INNER JOIN (
          SELECT DISTINCT(d.id) AS id_denuncia
          FROM denuncia as d
          INNER JOIN denuncia_delito as dd ON d.id = dd.id_denuncia AND dd.id_parametro_delito = '${params.idDelito}' AND dd._deleted_at IS NULL
          WHERE  d.id_tipo_proceso = '${ID_PROCESO_LGI}' AND d.caso_concluido = FALSE
        ) tipo_denuncia ON d.id = tipo_denuncia.id_denuncia`;
      }

      return `
      SELECT
        COALESCE(SUM(CASE WHEN d.id_tipo_origen = 'ead28ade-c9d7-49e0-ae4c-c84f61e557ff' THEN 1 ELSE 0 END), 0) AS "DENUNCIA (PARTICULAR)",
        COALESCE(SUM(CASE WHEN d.id_tipo_origen = 'acd9cae3-08fb-4ab6-bddd-2cb4fe11f32e' THEN 1 ELSE 0 END), 0) AS "DE OFICIO",
        COALESCE(SUM(CASE WHEN d.id_tipo_origen = 'ce8e12ce-13a6-4993-b56c-11d12dfc7c65' THEN 1 ELSE 0 END), 0) AS "POR INFORME UIF",
        COALESCE(SUM(CASE WHEN d.id_tipo_origen = '77a39563-a841-4bd7-bfd1-54f7f597848c' THEN 1 ELSE 0 END), 0) AS "DENUNCIA (AUTORIDAD)",
        COALESCE(SUM(CASE WHEN d.id_tipo_origen IN (
              'ead28ade-c9d7-49e0-ae4c-c84f61e557ff',
              'acd9cae3-08fb-4ab6-bddd-2cb4fe11f32e',
              'ce8e12ce-13a6-4993-b56c-11d12dfc7c65',
              '77a39563-a841-4bd7-bfd1-54f7f597848c') THEN 1 ELSE 0 END ), 0) AS "TOTAL DE CASOS",
        COALESCE(SUM(pd.denunciados), 0) AS "NUMERO DE PERSONAS INVESTIGADOS",
        COALESCE(SUM(CASE WHEN d.etapa_actual = 'PRELIMINAR' THEN 1 ELSE 0 END), 0) AS "PRELIMINAR",
        COALESCE(SUM(CASE WHEN d.etapa_actual = 'PREPARATORIA' THEN 1 ELSE 0 END), 0) AS "PREPARATORIA",
        COALESCE(SUM(CASE WHEN d.etapa_actual IN ('JUICIO ORAL', 'SENTENCIA ABSOLUTORIA', 'SENTENCIA CONDENATORIA', 'SENTENCIA MIXTA') THEN 1 ELSE 0 END), 0) AS "JUICIO ORAL",
        COALESCE(SUM(CASE WHEN d.etapa_actual ILIKE '%APELACIÓN%' THEN 1 ELSE 0 END), 0) AS "RECURSO - APELACIÓN RESTRINGIDA",
        COALESCE(SUM(CASE WHEN d.etapa_actual ILIKE '%CASACIÓN%' THEN 1 ELSE 0 END), 0) AS "RECURSO - CASACIÓN",
        COALESCE(SUM(CASE WHEN d.etapa_actual = 'EJECUTORIA' THEN 1 ELSE 0 END), 0) AS "EJECUTORIA",
        COALESCE(SUM(CASE WHEN d.etapa_actual IN ('PRELIMINAR', 'PREPARATORIA',
              'JUICIO ORAL', 'SENTENCIA ABSOLUTORIA', 'SENTENCIA CONDENATORIA', 'SENTENCIA MIXTA', 'EJECUTORIA') OR d.etapa_actual ILIKE '%APELACIÓN%'
              OR d.etapa_actual ILIKE '%CASACIÓN%'  THEN 1 ELSE 0 END ), 0) AS "TOTAL DE CASOS POR ETAPA"
      FROM denuncia as d
      ${subQueryTipoDenuncia}
      INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
      ${getConsultaUltimoActuado(filtrosConsulta)}
      LEFT JOIN (
        SELECT id_denuncia, COUNT(*) AS denunciados
        FROM participante as p
        INNER JOIN denuncia as d ON p.id_denuncia = d.id AND p.id_tipo_participante = '${idTipoParticipanteDenunciado}' AND  d.caso_concluido = FALSE AND d._deleted_at IS NULL
        INNER JOIN (
          ${subQueryCategoriaDelitoPrecedente}
        ) as dd ON dd.id = d.id
        WHERE
          p._deleted_at IS NULL
          ${filtrosConsulta.filtroUsuarioAsignado}
        GROUP BY id_denuncia
      ) pd ON d.id = pd.id_denuncia
      WHERE d.caso_concluido = FALSE
        AND d.etapa_actual != 'CERRADO'
        ${filtrosConsulta.filtroProceso}
        ${filtrosConsulta.filtroFechasDenuncia}
        ${filtrosConsulta.filtroDepartamento}
      `;
    }

    const respuesta = [];
    for (const param of params) {
      const respuestaParcial = await denuncia.options.sequelize.query(getConsulta(param, filtros));
      respuesta.push({
        label             : param.label,
        idParametroDelito : param.idDelito,
        value             : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }
  

  async function filtradoAvanzado (params = {}) {
    const query = getQuery(params);
    
    query.where = { casoConcluido: false };
    query.distinct = true;

    const whereParticipante = {};
    const whereDelito = {};

    const {IDPROCESODEFENSORIA, IDPROCESOSLIM} = TIPOPROCESO;

    query.include = [
      {
        required   : false,
        attributes : ['id', 'nombre_completo','numero_documento', 'nombre_razon_social', 'idTipoParticipante', 'edad', 'edadMeses'],
        model      : participante,
        as         : 'participantes'
      },
      {
        required : false,
        model    : parametro,
        as       : 'delitos'
      },
      {
        required   : false,
        attributes : ['id_tipo_bien', 'descripcion'],
        model      : bienesCautelados,
        as         : 'bienesCautelados'
      },
      {
        required : false,
        model    : DelitoPrecedente,
        as       : 'delitosPrecedentes'
      },
      {
        required : false,
        model    : Proceso,
        as       : 'proceso'
      },
      {
        required : false,
        model    : usuario,
        as       : 'usuarioAsignado'
      },
      {
        required   : false,
        through    : { attributes: [] },
        attributes : [],
        model      : entidad,
        as         : 'entidades'
      },
      {
        required : false,
        model    : parametro,
        as       : 'tipoOrigen'
      },
      {
        required   : false,
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipoConclusion'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'ciudad'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'tipoConclusionHijo'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'etapaCaso'
      },
      {
        model      : Seguimiento,
        as         : 'seguimiento',
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'defensoria'
      },
      {
        attributes : ['id', 'nombre', 'descripcion'],
        model      : parametro,
        as         : 'slim'
      },
      {
        attributes : ['id', 'nombre'],
        model      : parametro,
        as         : 'zona'
      },
    ];

    if (params.fechaDenunciaInicio || params.fechaDenunciaFin) {
      query.where.fechaDenuncia = {
        [Op.gte] : params.fechaDenunciaInicio || '1990-01-01',
        [Op.lte] : params.fechaDenunciaFin || '2200-12-30'
      };
    }
    
    if (params.idTipoProceso) {
      query.where.idTipoProceso = params.idTipoProceso;
    }

    if (params.defensorias && IDPROCESODEFENSORIA == params.idTipoProceso) {
      if (Array.isArray(params.defensorias)) query.where.idDefensoria = { [Op.in]: params.defensorias };
    };

    if (params.slims && IDPROCESOSLIM == params.idTipoProceso) {
      if (Array.isArray(params.slims)) query.where.idSlim = { [Op.in]: params.slims };
    };

    if (params.codigoDenuncia) query.where.codigoDenuncia = { [Op.iLike]: `%${params.codigoDenuncia}%` };

    if (params.idCiudad) {
      query.where.idCiudad = params.idCiudad;
      if (Array.isArray(params.idCiudad)) query.where.idCiudad = { [Op.in]: params.idCiudad };
    }

    if (params.idZona) {
      query.where.idZona = params.idZona;
      if (Array.isArray(params.idZona)) query.where.idZona = { [Op.in]: params.idZona };
    }

    if (params.idSlim) {
      query.where.idSlim = params.idSlim;
      if (Array.isArray(params.idSlim)) query.where.idSlim = { [Op.in]: params.idSlim };
    }

    if (params.idDefensoria) {
      query.where.idDefensoria = params.idDefensoria;
      if (Array.isArray(params.idDefensoria)) query.where.idDefensoria = { [Op.in]: params.idDefensoria };
    }

    if (params.areaGeografica) {
      query.where.areaGeografica = params.areaGeografica;
      if (Array.isArray(params.areaGeografica)) query.where.areaGeografica = { [Op.in]: params.areaGeografica };
    }

    if (params.fechaIngresoSepdaviInicio || params.fechaIngresoSepdaviFin) {
      query.where.fechaIngreso = {
        [Op.gte] : params.fechaIngresoSepdaviInicio || '1990-01-01',
        [Op.lte] : params.fechaIngresoSepdaviFin || '2200-12-30'
      };
    }

    if (params.fechaRegistroInicio || params.fechaRegistroFin) {
      query.where.createdAt = {
        [Op.gte] : params.fechaRegistroInicio || '1990-01-01',
        [Op.lte] : params.fechaRegistroFin || '2200-12-30'
      };
    }

    if (params.denominacion) query.where.denominacion = { [Op.iLike]: `%${params.denominacion}%` };

    if (params.idDelito) {
      whereDelito.id = params.idDelito;
      if (Array.isArray(params.idDelito)) whereDelito.id = { [Op.in]: params.idDelito };
    };

    if (params.idEstadoEsp) {
      query.where.idEstadoEsp = params.idEstadoEsp;
      if (Array.isArray(params.idEstadoEsp)) query.where.idEstadoEsp = { [Op.in]: params.idEstadoEsp };
    }

    if (params.idEtapaProcesal) {
      query.where.idEtapaProcesal = params.idEtapaProcesal;
      if (Array.isArray(params.idEtapaProcesal)) query.where.idEtapaProcesal = { [Op.in]: params.idEtapaProcesal };
    }

    if (params.idEtapaCaso) {
      query.where.idEtapaCaso = params.idEtapaCaso;
      if (Array.isArray(params.idEtapaCaso)) query.where.idEtapaCaso = { [Op.in]: params.idEtapaCaso };
    }

    if (params.nurej) query.where.nurej = { [Op.iLike]: `%${params.nurej}%` };

    if (params.fiscal) query.where.fiscal = { [Op.iLike]: `%${params.fiscal}%` };

    if (params.juzgado) query.where.juzgado = { [Op.iLike]: `%${params.juzgado}%` };

    if (params.nombreJuez) query.where.nombreJuez = { [Op.iLike]: `%${params.nombreJuez}%` };

    if (params.policia) query.where.policia = { [Op.iLike]: `%${params.policia}%` };

    if (params.relacionHecho) query.where.relacionHecho = { [Op.iLike]: `%${params.relacionHecho}%` };

    if (params.estadoActual) {
      query.where.estadoActual = params.estadoActual;
      if (Array.isArray(params.estadoActual)) query.where.estadoActual = { [Op.in]: params.estadoActual };
    }

    if (params.idUsuarioAsignado) {
      query.where.idUsuarioAsignado = params.idUsuarioAsignado;
      if (Array.isArray(params.idUsuarioAsignado)) query.where.idUsuarioAsignado = { [Op.in]: params.idUsuarioAsignado };
    }

    if (params.casoConcluido) {
      // delete query.where.casoConcluido;
      query.where.casoConcluido = params.casoConcluido;
    }

    if (params.idTipoConclusion) {
      query.where.idTipoConclusion = params.idTipoConclusion;
      if (Array.isArray(params.idTipoConclusion)) query.where.idTipoConclusion = { [Op.in]: params.idTipoConclusion };
    }

    if (params.idTipoParticipante) {
      whereParticipante.idTipoParticipante = params.idTipoParticipante;
      if (Array.isArray(params.idTipoParticipante)) whereParticipante.id = { [Op.in]: params.idTipoParticipante };
    }

    if (params.idTipoDocumento) {
      whereParticipante.idTipoDocumento = params.idTipoDocumento;
      if (Array.isArray(params.idTipoDocumento)) whereParticipante.id = { [Op.in]: params.idTipoDocumento };
    }

    if (params.numeroDocumento) whereParticipante.numeroDocumento = { [Op.iLike]: `%${params.numeroDocumento}%` };

    if (params.nombreCompleto) whereParticipante.nombreCompleto = { [Op.iLike]: `%${params.nombreCompleto}%` };

    if (params.idGenero) {
      whereParticipante.idGenero = params.idGenero;
      if (Array.isArray(params.idGenero)) whereParticipante.id = { [Op.in]: params.idGenero };
    }

    if (params.idComunidad) {
      whereParticipante.idComunidad = params.idComunidad;
      if (Array.isArray(params.idComunidad)) whereParticipante.id = { [Op.in]: params.idComunidad };
    }

    if (params.edad) whereParticipante.edad = { [Op.iLike]: `%${params.edad}%` };
    if (params.edadMeses) whereParticipante.edadMeses = { [Op.iLike]: `%${params.edadMeses}%` };

    if (params.idEtapaProcesalSepdavi) {
      whereParticipante.idEtapaProcesal = params.idEtapaProcesalSepdavi;
      if (Array.isArray(params.idEtapaProcesalSepdavi)) whereParticipante.id = { [Op.in]: params.idEtapaProcesalSepdavi };
    }

    if (params.correlativoGamea) query.where.correlativoGamea = { [Op.iLike]: `%${params.correlativoGamea}%` };
    if (params.nombreVictima) query.where.nombreVictima = { [Op.iLike]: `%${params.nombreVictima}%` };
    if (params.documentoVictima) query.where.documentoVictima = { [Op.iLike]: `%${params.documentoVictima}%` };
    if (params.nombreDenunciante) query.where.nombreDenunciante = { [Op.iLike]: `%${params.nombreDenunciante}%` };
    if (params.documentoDenunciante) query.where.documentoDenunciante = { [Op.iLike]: `%${params.documentoDenunciante}%` };
    if (params.nombreDenunciado) query.where.nombreDenunciado = { [Op.iLike]: `%${params.nombreDenunciado}%` };
    if (params.documentoDenunciado) query.where.documentoDenunciado = { [Op.iLike]: `%${params.documentoDenunciado}%` };
    //--------------------- editado hasta aqui

    if (Object.keys(whereDelito).length > 0) {
      query.include[1].required = true;
      query.include[1].where = whereDelito;
    };

    if (Object.keys(whereParticipante).length > 0) {
      query.include[0].required = true;
      query.include[0].where = whereParticipante;
    };

    const result = await denuncia.findAndCountAll(query);
    return toJSON(result);
    // return await denuncia.findAndCountAll(query);
  }

  async function reporteBienesCautelados (params, filtros) {
    function getConsultaBienesCautelados (params, filtros) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);
      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);

      const queryFinal =  `
        SELECT
          COALESCE(SUM(casas), 0) AS "BIENES CASAS",
          COALESCE(SUM(casas_valor_economico), 0) AS "VALOR ECONOMICO CASAS",
          COALESCE(SUM(vehiculos_terrestres), 0) AS "VEHICULOS TERRESTRES",
          COALESCE(SUM(vehiculos_terrestres_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS TERRESTRES",
          COALESCE(SUM(vehiculos_arereos), 0) AS "VEHICULOS AEREOS",
          COALESCE(SUM(vehiculos_arereos_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS AEREOS",
          COALESCE(SUM(vehiculos_fluviales), 0) AS "VEHICULOS FLUVIALES",
          COALESCE(SUM(vehiculos_fluviales_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS FLUVIALES",
          COALESCE(SUM(otros_bienes), 0) AS "OTROS BIENES",
          COALESCE(SUM(otros_bienes_valor_economico), 0) AS "VALOR ECONOMICO OTROS BIENES",
          COALESCE(SUM(dineros_usd), 0) AS "DINERO (USD)",
          COALESCE(SUM(dineros_bs), 0) AS "DINERO (BS)",
          COALESCE(SUM(otros_dineros), 0) AS "OTROS DINEROS"
          FROM (
            SELECT *
            FROM denuncia as d
            INNER JOIN (${subQueryCategoriaDelitoPrecedente}) AS dd on dd.id = d.id
            ${getConsultaUltimoActuado(filtrosConsulta)}
            LEFT JOIN (
                SELECT
                d.id AS id_denuncia,
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.CASAS.join("','")}') THEN 1 ELSE 0 END), 0) AS "casas",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.CASAS.join("','")}') THEN (bc.valor_economico::FLOAT) ELSE 0 END), 0) AS "casas_valor_economico",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_TERRESTRES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_terrestres",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_TERRESTRES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_terrestres_valor_economico",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_AEREOS.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_arereos",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_AEREOS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_arereos_valor_economico",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_FLUVIALES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_fluviales",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.VEHICULOS_FLUVIALES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_fluviales_valor_economico",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.OTROS_BIENES.join("','")}') THEN 1 ELSE 0 END), 0) AS "otros_bienes",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.OTROS_BIENES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_bienes_valor_economico",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.DINEROS_USD.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_usd",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.DINEROS_BS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_bs",
                COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.OTROS_DINEROS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_dineros"
              FROM denuncia as d
              INNER JOIN bienes_cautelados as bc ON d.id = bc.id_denuncia AND bc.id_tipo_bien IN ('${BIENES_CAUTELADOS.TODOS_BIENES_CAUTELADOS.join("','")}') AND bc._deleted_at IS NULL
              WHERE  d.id_tipo_proceso = '${ID_PROCESO_LGI}'
              GROUP BY d.id
          ) cantidades ON cantidades.id_denuncia = d.id
          WHERE d._deleted_at IS NULL
            AND d.etapa_actual != 'CERRADO'
            ${filtrosConsulta.filtroProceso}
            ${filtrosConsulta.filtroFechasDenuncia}
            ${filtrosConsulta.filtroDepartamento}
            ${filtrosConsulta.filtroUsuarioAsignado}
        ) consolidado;`;
      return queryFinal;
    }

    const respuesta = [];
    for (const param of params) {
      const respuestaParcial = await denuncia.options.sequelize.query(getConsultaBienesCautelados(param, filtros));
      respuesta.push({
        label             : param.label,
        idParametroDelito : param.idDelito,
        value             : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reportePenasImpuestas (anios, dias, filtros) {
    function consultaDias (params) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);
      const queryFinal = `
        SELECT COUNT(*) total
        FROM participante as p
        INNER JOIN denuncia as d ON p.id_denuncia = d.id AND d._deleted_at IS NULL AND d.justificacion_caso_concluido IS NULL AND d.etapa_actual != 'CERRADO'
        ${getConsultaUltimoActuado(filtrosConsulta)}
        WHERE p.id_tipo_participante = '${ID_TIPO_PARTICIPANTE_DENUNCIADO}'
        AND p.anios_sentencia >= ${params.minimo} AND p.anios_sentencia <= ${params.maximo}
        ${filtrosConsulta.filtroFechasDenuncia}
        ${filtrosConsulta.filtroDepartamento}
        ${filtrosConsulta.filtroUsuarioAsignado}
      `;
      return  queryFinal;
    }

    function consultaAnios (params) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);
      const queryFinal = `
        SELECT  COUNT(*) total, COALESCE(SUM(CASE WHEN p.estimacion_monetaria IS NULL THEN 0 ELSE p.estimacion_monetaria END), 0) AS "totalMonetario"
        FROM participante as p
        INNER JOIN denuncia as d ON p.id_denuncia = d.id AND d._deleted_at IS NULL AND d.justificacion_caso_concluido IS NULL AND d.etapa_actual != 'CERRADO'
        ${getConsultaUltimoActuado(filtrosConsulta)}
        WHERE p.id_tipo_participante = '${ID_TIPO_PARTICIPANTE_DENUNCIADO}'
        AND p.dias_multa  >= ${params.minimo} AND p.dias_multa <= ${params.maximo}
        ${filtrosConsulta.filtroFechasDenuncia}
        ${filtrosConsulta.filtroDepartamento}
        ${filtrosConsulta.filtroUsuarioAsignado}
      `;
      return queryFinal;
    }

    const respuesta = { reporteDias: [], reporteAnios: [] };
    for (const anio of anios) {
      const respuestaParcial = await denuncia.options.sequelize.query(consultaDias(anio));
      respuesta.reporteAnios.push({
        label : anio.label,
        value : respuestaParcial[0][0]
      });
    }

    for (const dia of dias) {
      const respuestaParcial = await denuncia.options.sequelize.query(consultaAnios(dia));
      respuesta.reporteDias.push({
        label : dia.label,
        value : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reporteSoloDelitosPrecedentes (delitos, filtros) {
    function consulta (params) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);
      filtrosConsulta.incluyeLGI = false;
      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);
      const queryFinal = `
        SELECT
          COALESCE(SUM(CASE WHEN d.etapa_actual IN ('PRELIMINAR', 'PREPARATORIA') THEN 1 ELSE 0 END), 0) AS "INVESTIGACION",
          COALESCE(SUM(CASE WHEN d.etapa_actual IN ('JUICIO ORAL') THEN 1 ELSE 0 END), 0) AS "JUICIO",
          COALESCE(SUM(p.casos_sentencia), 0) AS "CASOS CON SENTENCIA",
          COALESCE(SUM(p.absolutoria), 0) AS "ABSOLUTORIA",
          COALESCE(SUM(p.condenatoria), 0) AS "CONDENATORIA",
          COALESCE(SUM(p.mixto), 0) AS "MIXTO",
          COALESCE(SUM(p.ejecutoria), 0) AS "EJECUTORIA"
        FROM denuncia as d
        INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
        ${getConsultaUltimoActuado(filtrosConsulta)}
        LEFT JOIN (
          SELECT
            id_denuncia,
            COALESCE(SUM(CASE WHEN p.id_situacion_juridica IN ('${SITUACION_JURIDICA.SENTENCIA.join("','")}') THEN 1 ELSE 0 END), 0) AS casos_sentencia,
            COALESCE(SUM(CASE WHEN p.id_situacion_juridica IN ('${SITUACION_JURIDICA.ABSOLUTORIA.join("','")}') THEN 1 ELSE 0 END), 0) AS absolutoria,
            COALESCE(SUM(CASE WHEN p.id_situacion_juridica IN ('${SITUACION_JURIDICA.CONDENATORIA.join("','")}') THEN 1 ELSE 0 END), 0) AS condenatoria,
            COALESCE(SUM(CASE WHEN p.id_situacion_juridica IN ('${SITUACION_JURIDICA.MIXTA.join("','")}') THEN 1 ELSE 0 END), 0) AS mixto,
            COALESCE(SUM(CASE WHEN p.id_medida_cautelar IN ('${SITUACION_JURIDICA.EJECUTORIA.join("','")}') THEN 1 ELSE 0 END), 0) AS ejecutoria
          FROM participante as p
          INNER JOIN denuncia as d ON d.id = p.id_denuncia AND d._deleted_at IS NULL ${filtrosConsulta.filtroProceso}
          WHERE p._deleted_at IS NULL
          AND d.caso_concluido = FALSE
          GROUP BY p.id_denuncia
        ) p ON d.id = p.id_denuncia
        WHERE d._deleted_at IS NULL AND d.caso_concluido = FALSE
          AND d.etapa_actual != 'CERRADO'
          ${filtrosConsulta.filtroProceso}
          ${filtrosConsulta.filtroFechasDenuncia}
          ${filtrosConsulta.filtroDepartamento}
      `;
      return queryFinal;
    }

    const respuesta = [];
    for (const delito of delitos) {
      const respuestaParcial = await denuncia.options.sequelize.query(consulta(delito));
      respuesta.push({
        label : delito.label,
        value : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reporteSentenciasLGI (sentencias, filtros) {
    function consulta (params) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);
      filtrosConsulta.incluyeLGI = true;

      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);

      const queryFinal =  `
        SELECT
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia ILIKE '%APELACIÓN%' THEN 1 ELSE 0 END), 0) AS "CON APELACIÓN RESTRINGIDA",
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia ILIKE '%CASACIÓN%' THEN 1 ELSE 0 END), 0) AS "EN CASACIÓN",
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia IN ('SENTENCIA CONDENATORIA') THEN 1 ELSE 0 END), 0) AS "CONDENATORIA",
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia IN ('SENTENCIA ABSOLUTORIA') THEN 1 ELSE 0 END), 0) AS "ABSOLUTORIA",
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia IN ('SENTENCIA MIXTA') THEN 1 ELSE 0 END), 0) AS "MIXTA",
          COALESCE(SUM(CASE WHEN sd.etapa_denuncia IN ('EJECUTORIA') THEN 1 ELSE 0 END), 0) AS "SENTENCIA EJECUTORIADA",
          COALESCE(SUM(p.sentencia_condenatoria), 0) AS "NUMERO DE PERSONAS CONDENADAS"
        FROM denuncia as d
        INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
        ${getConsultaUltimoActuado(filtrosConsulta)}
        LEFT JOIN (
          SELECT
            id_denuncia,
            COALESCE(SUM(CASE WHEN p.id_situacion_juridica  IN ('831d4337-f15f-43d9-ab58-a169a00e74b4') THEN 1 ELSE 0 END), 0) AS sentencia_condenatoria
          FROM participante as p
          INNER JOIN denuncia as d ON d.id = p.id_denuncia AND d._deleted_at IS NULL ${filtrosConsulta.filtroProceso}
            AND d.caso_concluido = FALSE
          WHERE p._deleted_at IS NULL
          GROUP BY p.id_denuncia
        ) p ON d.id = p.id_denuncia
        WHERE d._deleted_at IS NULL
         AND d.etapa_actual != 'CERRADO'
          ${filtrosConsulta.filtroProceso}
          ${filtrosConsulta.filtroFechasDenuncia}
          ${filtrosConsulta.filtroDepartamento}
      `;
      return queryFinal;
    }

    const respuesta = [];
    for (const sentencia of sentencias) {
      const respuestaParcial = await denuncia.options.sequelize.query(consulta(sentencia));
      respuesta.push({
        label : sentencia.label,
        value : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reporteBienesDecomisados (params, filtros) {
    function getConsultaBienesDecomisados (params, filtros) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);

      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);
      const queryFinal = `
       SELECT
        COALESCE(SUM(casas), 0) AS "BIENES CASAS",
        COALESCE(SUM(casas_valor_economico), 0) AS "VALOR ECONOMICO CASAS",
        COALESCE(SUM(vehiculos_terrestres), 0) AS "VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_terrestres_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_arereos), 0) AS "VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_arereos_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_fluviales), 0) AS "VEHICULOS FLUVIALES",
        COALESCE(SUM(vehiculos_fluviales_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS FLUVIALES",
        COALESCE(SUM(otros_bienes), 0) AS "OTROS BIENES",
        COALESCE(SUM(otros_bienes_valor_economico), 0) AS "VALOR ECONOMICO OTROS BIENES",
        COALESCE(SUM(dineros_usd), 0) AS "DINERO (USD)",
        COALESCE(SUM(dineros_bs), 0) AS "DINERO (BS)",
        COALESCE(SUM(otros_dineros), 0) AS "OTROS DINEROS"
      FROM (
        SELECT *
        FROM denuncia as d
        INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
        ${getConsultaUltimoActuado(filtrosConsulta)}
        LEFT JOIN (
            SELECT
              d.id AS id_denuncia,
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.CASAS.join("','")}') THEN 1 ELSE 0 END), 0) AS "casas",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.CASAS.join("','")}') THEN (bc.valor_economico::FLOAT) ELSE 0 END), 0) AS "casas_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_TERRESTRES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_terrestres",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_TERRESTRES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_terrestres_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_AEREOS.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_arereos",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_AEREOS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_arereos_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_FLUVIALES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_fluviales",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.VEHICULOS_FLUVIALES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_fluviales_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.OTROS_BIENES.join("','")}') THEN 1 ELSE 0 END), 0) AS "otros_bienes",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.OTROS_BIENES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_bienes_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.DINEROS_USD.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_usd",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.DINEROS_BS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_bs",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.OTROS_DINEROS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_dineros"
            FROM denuncia as d
            INNER JOIN bienes_cautelados as bc ON d.id = bc.id_denuncia AND bc.id_tipo_bien IN ('${BIENES_DECOMISADOS.TODOS_BIENES_DECOMISADOS.join("','")}') AND bc._deleted_at IS NULL
          WHERE d._deleted_at IS NULL
            AND d.etapa_actual != 'CERRADO'
            ${filtrosConsulta.filtroProceso}
            ${filtrosConsulta.filtroFechasDenuncia}
            ${filtrosConsulta.filtroDepartamento}
          GROUP BY d.id
        ) cantidades ON cantidades.id_denuncia = d.id
        WHERE d._deleted_at IS NULL
          AND d.etapa_actual != 'CERRADO'
          ${filtrosConsulta.filtroProceso}
          ${filtrosConsulta.filtroFechasDenuncia}
          ${filtrosConsulta.filtroDepartamento}
        ) consolidado;`;

      return queryFinal;
    }

    const respuesta = [];
    for (const param of params) {
      const respuestaParcial = await denuncia.options.sequelize.query(getConsultaBienesDecomisados(param, filtros));
      respuesta.push({
        label             : param.label,
        idParametroDelito : param.idDelito,
        value             : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reporteBienesConfiscados (params, filtros) {
    function getConsultaBienesDecomisados (params, filtros) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);

      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);
      const queryFinal = `
       SELECT
        COALESCE(SUM(casas), 0) AS "BIENES CASAS",
        COALESCE(SUM(casas_valor_economico), 0) AS "VALOR ECONOMICO CASAS",
        COALESCE(SUM(vehiculos_terrestres), 0) AS "VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_terrestres_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_arereos), 0) AS "VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_arereos_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_fluviales), 0) AS "VEHICULOS FLUVIALES",
        COALESCE(SUM(vehiculos_fluviales_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS FLUVIALES",
        COALESCE(SUM(otros_bienes), 0) AS "OTROS BIENES",
        COALESCE(SUM(otros_bienes_valor_economico), 0) AS "VALOR ECONOMICO OTROS BIENES",
        COALESCE(SUM(dineros_usd), 0) AS "DINERO (USD)",
        COALESCE(SUM(dineros_bs), 0) AS "DINERO (BS)",
        COALESCE(SUM(otros_dineros), 0) AS "OTROS DINEROS"
      FROM (
        SELECT *
        FROM denuncia as d
        INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
        ${getConsultaUltimoActuado(filtrosConsulta)}
        LEFT JOIN (
            SELECT
              d.id AS id_denuncia,
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.CASAS.join("','")}') THEN 1 ELSE 0 END), 0) AS "casas",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.CASAS.join("','")}') THEN (bc.valor_economico::FLOAT) ELSE 0 END), 0) AS "casas_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_TERRESTRES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_terrestres",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_TERRESTRES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_terrestres_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_AEREOS.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_arereos",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_AEREOS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_arereos_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_FLUVIALES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_fluviales",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.VEHICULOS_FLUVIALES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_fluviales_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.OTROS_BIENES.join("','")}') THEN 1 ELSE 0 END), 0) AS "otros_bienes",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.OTROS_BIENES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_bienes_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.DINEROS_USD.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_usd",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.DINEROS_BS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_bs",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.OTROS_DINEROS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_dineros"
            FROM denuncia as d
            INNER JOIN bienes_cautelados as bc ON d.id = bc.id_denuncia AND bc.id_tipo_bien IN ('${BIENES_CONFISCADOS.TODOS_BIENES_CONFISCADOS.join("','")}') AND bc._deleted_at IS NULL
          WHERE d._deleted_at IS NULL
            AND d.etapa_actual != 'CERRADO'
            ${filtrosConsulta.filtroProceso}
            ${filtrosConsulta.filtroFechasDenuncia}
            ${filtrosConsulta.filtroDepartamento}
          GROUP BY d.id
        ) cantidades ON cantidades.id_denuncia = d.id
        WHERE d._deleted_at IS NULL
          AND d.etapa_actual != 'CERRADO'
          ${filtrosConsulta.filtroProceso}
          ${filtrosConsulta.filtroFechasDenuncia}
          ${filtrosConsulta.filtroDepartamento}
        ) consolidado;`;

      return queryFinal;
    }

    const respuesta = [];
    for (const param of params) {
      const respuestaParcial = await denuncia.options.sequelize.query(getConsultaBienesDecomisados(param, filtros));
      respuesta.push({
        label             : param.label,
        idParametroDelito : param.idDelito,
        value             : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function reporteBienesIncautados (params, filtros) {
    function getConsultaBienesDecomisados (params, filtros) {
      const filtrosConsulta = getFiltrosGenerales(params, filtros);

      const subQueryCategoriaDelitoPrecedente = getConsultaDelitoPrecedente(filtrosConsulta);
      const queryFinal = `
       SELECT
        COALESCE(SUM(casas), 0) AS "BIENES CASAS",
        COALESCE(SUM(casas_valor_economico), 0) AS "VALOR ECONOMICO CASAS",
        COALESCE(SUM(vehiculos_terrestres), 0) AS "VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_terrestres_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS TERRESTRES",
        COALESCE(SUM(vehiculos_arereos), 0) AS "VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_arereos_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS AEREOS",
        COALESCE(SUM(vehiculos_fluviales), 0) AS "VEHICULOS FLUVIALES",
        COALESCE(SUM(vehiculos_fluviales_valor_economico), 0) AS "VALOR ECONOMICO VEHICULOS FLUVIALES",
        COALESCE(SUM(otros_bienes), 0) AS "OTROS BIENES",
        COALESCE(SUM(otros_bienes_valor_economico), 0) AS "VALOR ECONOMICO OTROS BIENES",
        COALESCE(SUM(dineros_usd), 0) AS "DINERO (USD)",
        COALESCE(SUM(dineros_bs), 0) AS "DINERO (BS)",
        COALESCE(SUM(otros_dineros), 0) AS "OTROS DINEROS"
      FROM (
        SELECT *
        FROM denuncia as d
        INNER JOIN (${subQueryCategoriaDelitoPrecedente}) dp ON d.id = dp.id
        ${getConsultaUltimoActuado(filtrosConsulta)}
        LEFT JOIN (
            SELECT
              d.id AS id_denuncia,
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.CASAS.join("','")}') THEN 1 ELSE 0 END), 0) AS "casas",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.CASAS.join("','")}') THEN (bc.valor_economico::FLOAT) ELSE 0 END), 0) AS "casas_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_TERRESTRES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_terrestres",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_TERRESTRES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_terrestres_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_AEREOS.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_arereos",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_AEREOS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_arereos_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_FLUVIALES.join("','")}') THEN 1 ELSE 0 END), 0) AS "vehiculos_fluviales",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.VEHICULOS_FLUVIALES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "vehiculos_fluviales_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.OTROS_BIENES.join("','")}') THEN 1 ELSE 0 END), 0) AS "otros_bienes",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.OTROS_BIENES.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_bienes_valor_economico",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.DINEROS_USD.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_usd",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.DINEROS_BS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "dineros_bs",
              COALESCE(SUM(CASE WHEN bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.OTROS_DINEROS.join("','")}') THEN bc.valor_economico::FLOAT ELSE 0 END), 0) AS "otros_dineros"
            FROM denuncia as d
            INNER JOIN bienes_cautelados as bc ON d.id = bc.id_denuncia AND bc.id_tipo_bien IN ('${BIENES_INCAUTADOS.TODOS_BIENES_INCAUTADOS.join("','")}') AND bc._deleted_at IS NULL
          WHERE d._deleted_at IS NULL
            AND d.etapa_actual != 'CERRADO'
            ${filtrosConsulta.filtroProceso}
            ${filtrosConsulta.filtroFechasDenuncia}
            ${filtrosConsulta.filtroDepartamento}
          GROUP BY d.id
        ) cantidades ON cantidades.id_denuncia = d.id
        WHERE d._deleted_at IS NULL
          AND d.etapa_actual != 'CERRADO'
          ${filtrosConsulta.filtroProceso}
          ${filtrosConsulta.filtroFechasDenuncia}
          ${filtrosConsulta.filtroDepartamento}
        ) consolidado;`;

      return queryFinal;
    }

    const respuesta = [];
    for (const param of params) {
      const respuestaParcial = await denuncia.options.sequelize.query(getConsultaBienesDecomisados(param, filtros));
      respuesta.push({
        label             : param.label,
        idParametroDelito : param.idDelito,
        value             : respuestaParcial[0][0]
      });
    }

    return respuesta;
  }

  async function findCount (idTipoProceso) {
    
    const result = await denuncia.count({where:{idTipoProceso}});
    return result;
  }

  return {
    reporteBienesConfiscados,
    reporteBienesIncautados,
    reporteBienesDecomisados,
    reporteSentenciasLGI,
    reporteSoloDelitosPrecedentes,
    reportePenasImpuestas,
    reporteBienesCautelados,
    filtradoAvanzado,
    reporteAvanzadoDelitos,
    reporteRetencionFondos,
    reporteBienCautelado,
    reporteDelitoPrecendete,
    reportesDenuncia,
    findAll,
    findByUUID,
    findCount,
    findOne        : (params, t) => Repository.findOne(params, denuncia, t),
    findById       : (id) => Repository.findById(id, denuncia),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, denuncia, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, denuncia, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, denuncia, t)

  };
};
