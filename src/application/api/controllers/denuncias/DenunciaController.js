'use strict';
const debug = require('debug')('app:controller:REPORTE');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
//const XLSX = require('xlsx');
const { config } = require('../../../../common');
const { TIPOPROCESO, REPORTEEXCEL } = require('../../../../common/config/constants');
const Excel = require('exceljs');
const moment = require('moment');

module.exports = function setupEntidadController (services) {
  const { DenunciaService, PermisoService, ParametroService, UsuarioService, SeguimientoService, ParticipanteService } = services;

  async function listar (req, res) {
    try {
      const tienePermiso = await PermisoService.verificarPermisos(req.user.idRoles, ['denuncia:listar:todo']);
      if (!tienePermiso) {
        req.query.idUsuarioAsignado = req.user.idUsuario;
      }
      const { idUsuario } = req.user;

      const usuario =await UsuarioService.findOne(idUsuario);
      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await DenunciaService.listar(req.query);
      } else if (usuario.nivel == 'MEDIO') {
        req.query.slims = usuario.slims.map(item => item.id);
        req.query.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await DenunciaService.listar(req.query);
      }

      for (let z = 0; z < respuesta.rows.length; z++) {
        const elm = respuesta.rows[z];
        elm.color = calcularTiempo (elm);
        elm.opcionReasignacion = idUsuario == elm.usuarioAsignado.id
      }
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  function calcularTiempo (data) {
    const { seguimiento } = data
    let llenadoActivo = null;
    for (let z = 0; z < seguimiento.length; z++) {
      const elm = seguimiento[z]
      
      if (elm.tipo_seguimiento != 'SISTEMA' && elm.fecha_fin && !elm.se_atendio) {
        if (llenadoActivo && moment(elm.fecha_fin) > moment(llenadoActivo?.fecha_fin)) {
          llenadoActivo = elm
        } else if (!llenadoActivo) llenadoActivo = elm
      }
    }
    if (llenadoActivo) {
      const fechaInicial = moment(llenadoActivo.fecha_fin, 'YYYY-MM-DD')
      const fechaActual = moment()
      
      const dias = fechaActual.diff(fechaInicial, 'days')

      if (dias < 6 || dias === 732 || dias === 733) return 'primary'
      else if (dias >= 6 && dias <= 12) return 'yellow'
      else return 'red'
    } else return 'primary'
  }

  async function mostrar (req, res) {
    try {
      const { id } = req.params;
      const respuesta = await DenunciaService.findById(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function crear (req, res) {
    try {
      const data = req.body;
      debug('creando denuncia');
      data.userCreated = req.user.idUsuario; // corregir
      data.idUsuarioAsignado = req.user.idUsuario;
      // data.idEntidad = req.user.idEntidad;
      data.estadoActual = 'REGISTRADO';
      data.asignacionAnterior = [];
      if(data.participantes) data.participantes = JSON.parse(data.participantes);

      const usuario =await UsuarioService.findOne(req.user.idUsuario);

      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await DenunciaService.createOrUpdate(data);
      } else if (usuario.nivel == 'MEDIO') {
        data.slims = usuario.slims.map(item => item.id);
        data.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await DenunciaService.createOrUpdate(data);
      }

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizar (req, res) {
    try {
      debug('actualizando denuncia');
      const data = req.body;
      data.id = req.params.id;
      data.userUpdated = req.user.idUsuario;
      if(data.denunciaGrupoFamiliar) data.denunciaGrupoFamiliar = JSON.parse(data.denunciaGrupoFamiliar);
      const usuario =await UsuarioService.findOne(req.user.idUsuario);
      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await DenunciaService.createOrUpdate(data);
      } else if (usuario.nivel == 'MEDIO') {
        data.slims = usuario.slims.map(item => item.id);
        data.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await DenunciaService.createOrUpdate(data);
      }
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      const respuesta = await DenunciaService.deleteItem({
        id          : req.params.id,
        userDeleted : req.user.idUsuario
      });
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporte (req, res) {
    try {
      const { idTipoProceso, ciudad, municipioHecho, etapa, tipoDelito, rangoEtario, etiqueta, fase, key, usuario, casosUsuario} = req.query;
      if (!idTipoProceso) {
        throw new Error('Debe especificar el tipo de proceso para realizar el reporte.');
      }
      
      const respuesta = await DenunciaService.reportesDenuncia({ idTipoProceso, ciudad, municipioHecho, etapa, tipoDelito, rangoEtario, etiqueta, fase, key, usuario, casosUsuario});
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reasignar (req, res) {
    try {
      debug('Reasignando denuncia');
      const { idDenuncia, idUsuarioAsignado, rolActual, idProceso } = req.body;
      const respuesta = await DenunciaService.reasignarDenuncia({
        idDenuncia,
        idUsuarioAsignado,
        userUpdated: req.user.idUsuario,
        idProceso,
        rolActual
      });
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function cerrarDenuncia (req, res) {
    try {
      debug('Reasignando denuncia');
      const { id } = req.params;
      const datos = {
        id,
        estadoActual : 'CERRADO',
        etapaActual  : 'CERRADO',
        userUpdated  : req.user.idUsuario
      };
      const respuesta = await DenunciaService.cerrarDenuncia(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  function formatQueryReport (params, key) {
    let from = 'FROM denuncia d';
    let where = `WHERE d._deleted_at IS NULL AND d.id_tipo_proceso = '${params.idTipoProceso}'`;
    if (params.tipoDelito && key !== 'tipoDelito') {
      where += `\n\tAND d.tipo_delito ${params.tipoDelito === 'SIN REGISTRO' ? 'IS NULL' : "= '" + params.tipoDelito + "'"}`;
    }
    if (params.etapa && key !== 'etapa') {
      where += `\n\tAND d.etapa_actual ${params.etapa === 'SIN SEGUIMIENTO' ? 'IS NULL' : "= '" + params.etapa + "'"}`;
    }
    if (params.lugarHecho && key !== 'lugarHecho') {
      where += `\n\tAND d.lugar_hecho = '${params.lugarHecho}'`;
    }
    if (params.lugarHecho && params.municipioHecho && key !== 'municipioHecho') {
      where += `\n\tAND d.municipio_hecho ${params.municipioHecho === 'SIN REGISTRO' ? 'IS NULL' : "= '" + params.municipioHecho + "'"}`;
    }
    if (params.fase && key !== 'fase') {
      where += `\n\tAND d.fase = '${params.fase}'`;
    }
    if (params.rangoEtario && key !== 'rangoEtario') {
      let rangoEtario;
      switch (params.rangoEtaria) {
        case 'PRIMERA INFANCIA':
          rangoEtario = 'BETWEEN 0 AND 5';
          break;
        case 'INFANCIA ESCOLAR':
          rangoEtario = 'BETWEEN 6 AND 11';
          break;
        case 'ADOLECENCIA':
          rangoEtario = 'BETWEEN 12 AND 17';
          break;
        case 'ADULTEZ':
          rangoEtario = 'BETWEEN 18 AND 59';
          break;
        case 'ADULTO MAYOR':
          rangoEtario = '>= 60';
          break;
        default:
          rangoEtario = 'IS NULL';
          break;
      }
      from += `\n\tINNER JOIN public.participante p ON (p.id_denuncia = d.id AND p.edad ${rangoEtario})`;
      where += "\n\tAND p._deleted_at IS NULL\n\tAND p.id_tipo_participante = '5f0d1aaa-498f-4ad2-96d3-3f7349526475'";
    } else {
      if (key === 'rangoEtario') {
        from += '\n\tINNER JOIN public.participante p ON (p.id_denuncia = d.id)';
        where += "\n\tAND p._deleted_at IS NULL\n\tAND p.id_tipo_participante = '5f0d1aaa-498f-4ad2-96d3-3f7349526475'";
      }
    }
    if (params.etiqueta && key !== 'etiqueta') {
      where += `\n\tAND d.etiquetas ${params.etiqueta === 'SIN REGISTRO' ? 'IS NULL' : "ILIKE '%" + params.etiqueta + "%'"}`;
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
  async function reporteTipoDelito (params) {
    const [from, where] = formatQueryReport(params, 'tipoDelito');
    const query = `
      SELECT COALESCE(d.tipo_delito, 'SIN REGISTRO') tipo_delito, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY COALESCE(d.tipo_delito, 'SIN REGISTRO')
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reporteFase (params) {
    const [from, where] = formatQueryReport(params, 'fase');
    const query = `
      SELECT UNNEST(STRING_TO_ARRAY(COALESCE(d.fase, 'SIN REGISTRO'), ',')) AS fase, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY UNNEST(STRING_TO_ARRAY(COALESCE(d.fase, 'SIN REGISTRO'), ','))
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reporteEtiqueta (params) {
    const [from, where] = formatQueryReport(params, 'etiqueta');
    const query = `
      SELECT UNNEST(STRING_TO_ARRAY(COALESCE(d.etiquetas, 'SIN REGISTRO'), ',')) AS etiqueta, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY UNNEST(STRING_TO_ARRAY(COALESCE(d.etiquetas, 'SIN REGISTRO'), ','))
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reporteCiudad (params) {
    const [from, where] = formatQueryReport(params, 'ciudad');
    const query = `
      SELECT d.ciudad, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY d.ciudad
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reporteMunicipioHecho (params) {
    const [from, where] = formatQueryReport(params, 'municipioHecho');
    const query = `
      SELECT COALESCE(d.municipio_hecho, 'SIN REGISTRO') AS municipio_hecho, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY d.municipio_hecho
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reporteRangoEtario (params) {
    const [from, where] = formatQueryReport(params, 'rangoEtario');
    const query = `
      SELECT CASE
        WHEN p.edad BETWEEN 0 AND 5 THEN 'PRIMERA INFANCIA'
        WHEN p.edad BETWEEN 6 AND 11 THEN 'INFANCIA ESCOLAR'
        WHEN p.edad BETWEEN 12 AND 17 THEN 'ADOLECENCIA'
        WHEN p.edad BETWEEN 18 AND 59 THEN 'ADULTEZ'
        WHEN p.edad >= 60 THEN 'ADULTO MAYOR'
        ELSE 'SIN EDAD REGISTRADA' END AS edad, COUNT(1) AS total
      ${from}
      ${where}
      GROUP BY CASE
        WHEN p.edad BETWEEN 0 AND 5 THEN 'PRIMERA INFANCIA'
        WHEN p.edad BETWEEN 6 AND 11 THEN 'INFANCIA ESCOLAR'
        WHEN p.edad BETWEEN 12 AND 17 THEN 'ADOLECENCIA'
        WHEN p.edad BETWEEN 18 AND 59 THEN 'ADULTEZ'
        WHEN p.edad >= 60 THEN 'ADULTO MAYOR'
        ELSE 'SIN EDAD REGISTRADA' END
    `;
    const [results] = await denuncia.options.sequelize.query(query);
    return results || null;
  }
  async function reportesDenuncia (params) {
    const key = params.key;
    
    delete params.key;
    switch (key) {
      case 'tipoDelito':
        return await reporteTipoDelito(params);
      case 'etapa':
        return await reporteEtapa(params);
      case 'ciudad':
        return await reporteCiudad(params);
      case 'municipioHecho':
        if (params.lugarHecho) {
          return await reporteMunicipioHecho(params);
        }
        return null;
      case 'fase':
        return await reporteFase(params);
      case 'etiqueta':
        return await reporteEtiqueta(params);
      case 'rangoEtario':
        return await reporteRangoEtario(params);
      default:
        return null;
    }
  }

  async function reporteDenuncia (req, res) {
    try {
      const { id } = req.params;
      const idUsuario = req.user.idUsuario;
      const { idRol, nro, idParticipante, idParametro} = req.query;
      
      const respuesta = await DenunciaService.reporteDenuncia(id, idUsuario, idRol, nro, idParticipante, idParametro);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteAvanzadoLGIFT (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.generarReporteAvanzado(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function getFiltrosReporte (req, res) {
    try {
      const datos = req.query;
      
      const { idUsuario } = req.user;
      const usuario =await UsuarioService.findOne(idUsuario);
      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await DenunciaService.getFiltrosReporte(datos);
      } else if (usuario.nivel == 'MEDIO') {
        datos.slims = usuario.slims.map(item => item.id);
        datos.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await DenunciaService.getFiltrosReporte(datos);
      }
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function filtradoAvanzado (req, res) {
    try {
      // const tienePermiso = await PermisoService.verificarPermisos(req.user.idRoles, ['denuncia:listar:todo']);

      // if (!tienePermiso) req.query.idUsuarioAsignado = req.user.idUsuario;
      const { idUsuario } = req.user;
      const usuario =await UsuarioService.findOne(idUsuario);
      let respuesta;
      if (usuario.nivel == 'ALTO') {
        respuesta = await DenunciaService.filtradoAvanzado(req.query);
      } else if (usuario.nivel == 'MEDIO') {
        req.query.slims = usuario.slims.map(item => item.id);
        req.query.defensorias = usuario.defensorias.map(item => item.id);
        respuesta = await DenunciaService.filtradoAvanzado(req.query);
      }

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }


  async function generarExcel (req, res) {
    const rootPath = config.app.path;
    try {

      const usuario = await UsuarioService.findOne(req.user.idUsuario);
      if (usuario.nivel == 'MEDIO') {
        req.query.slims = usuario.slims.map(item => item.id);
        req.query.defensorias = usuario.defensorias.map(item => item.id);
      }

      const { rows } = await DenunciaService.filtradoAvanzado(req.query);

      const {IDPROCESODEFENSORIA} = TIPOPROCESO;

      const tituloServicio = IDPROCESODEFENSORIA == req.query.idTipoProceso ? 'DIRECCIÓN DEFENSORIA MUNICIPAL' : 'DIRECCIÓN SLIM MUNICIPAL';
      const tipoServicio = IDPROCESODEFENSORIA == req.query.idTipoProceso ? 'DEFENSORIAS' : 'SLIMS';

      

      const {ORIENTACION, SOCIAL, PSICOLOGIA, PATROCINIO} = REPORTEEXCEL;
      const data = {...req.query, limit:1};
      
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Datos');

      worksheet.mergeCells('A1:E1');
      let cell = worksheet.getCell('A1');
      cell.value = 'SECRETARIA MUNICIPAL DE DESARROLLO SOCIAL';

      worksheet.mergeCells('A2:E2');
      cell = worksheet.getCell('A2');
      cell.value = tituloServicio;

      worksheet.mergeCells('A3:E3');
      cell = worksheet.getCell('A3');
      cell.value = 'UNIDAD DE DEFENSA INTEGRAL A LA FAMILIA';

      worksheet.mergeCells('A4:E4');
      cell = worksheet.getCell('A4');
      cell.value = 'PLATAFORMA: PAIF PERIFERICA';

      worksheet.mergeCells('A5:E5');
      cell = worksheet.getCell('A5');
      cell.value = tipoServicio;

      worksheet.mergeCells('A6:E6');
      cell = worksheet.getCell('A6');
      cell.value = `PROFESIONAL: ${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`;

      worksheet.mergeCells('F1:R6');
      cell = worksheet.getCell('F1');
      cell.value = 'REPORTE GENERAL';
      cell.font = { size: 14 };
      cell.alignment = { horizontal: 'center', vertical: 'middle'};

      worksheet.mergeCells('A8:A10');
      cell = worksheet.getCell('A8');
      cell.value = 'Nro';
      cell.alignment = { horizontal: 'center', vertical: 'middle'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      worksheet.mergeCells('B8:E8');
      cell = worksheet.getCell('B8');
      cell.value = 'DATOS DEL CASO';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      worksheet.mergeCells('F8:H8');
      cell = worksheet.getCell('F8');
      cell.value = 'DATOS DE LA VICTIMA';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DE5529' }
      };

      worksheet.mergeCells('I8:J8');
      cell = worksheet.getCell('I8');
      cell.value = 'DATOS DEL IMPUTADO/DENUNCIADO';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      worksheet.mergeCells('K8:N8');
      cell = worksheet.getCell('K8');
      cell.value = 'SITUACIÓN LEGAL DEL CASO';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DE5529' }
      };

      worksheet.mergeCells('O8:R8');
      cell = worksheet.getCell('O8');
      cell.value = 'ACCIONES';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('B9');
      cell.value = 'Código Caso';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('C9');
      cell.value = 'Fecha de Ingreso';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('D9');
      cell.value = 'Fecha del Hecho';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('E9');
      cell.value = 'Tipologia Principal (Problemática)';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('F9');
      cell.value = 'Sexo';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('G9');
      cell.value = 'Edad(años)';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('H9');
      cell.value = 'Nombre y Apellidos';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('I9');
      cell.value = 'edad';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('J9');
      cell.value = 'Nombre y Apellidos';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('K9');
      cell.value = 'Tipo de Proceso Instaurado';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('L9');
      cell.value = 'Autoridad Jurisdiccional que conoce la Causa';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('M9');
      cell.value = 'Fiscal Asignado - División';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('N9');
      cell.value = 'Estado del Proceso';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('O9');
      cell.value = 'ACCIONES DEL AREA DE  TRABAJO SOCIAL (ultima acción)';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('P9');
      cell.value = 'ACCIONES DEL AREA  PSICOLOGICA (ultima acción)';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('Q9');
      cell.value = 'ACIONES DEL  AREA LEGAL (ultima acción)';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      cell = worksheet.getCell('R9');
      cell.value = 'OBSERVACIONES';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      worksheet.mergeCells('B10:R10');
      cell = worksheet.getCell('B10');
      cell.value = 'DENUNCIAS Y APERSONAMIENTO PENALES';
      cell.alignment = { horizontal: 'center'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFA500' }
      };

      worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          const desiredWidth = Math.max(10, cell.value ? cell.value.toString().length + 2 : 10); // Ajustar ancho mínimo
          worksheet.getColumn(colNumber).width = desiredWidth;
        });
      });
      
      let paramVictima;
      let paramDenunciado;
      let paramGeneroMasculino;
      let paramGeneroFemenino;
      if (IDPROCESODEFENSORIA == req.query.idTipoProceso) {
        paramVictima =await ParametroService.findOne({nombre: 'VICTIMA', grupo: 'TIPO_PARTICIPANTE', idProceso: req.query.idTipoProceso});
        paramDenunciado =await ParametroService.findOne({nombre: 'DENUNCIADO', grupo: 'TIPO_PARTICIPANTE', idProceso: req.query.idTipoProceso});
        paramGeneroMasculino = await ParametroService.findOne({nombre: 'Masculino', grupo: 'GENERO', idProceso: req.query.idTipoProceso});
        paramGeneroFemenino = await ParametroService.findOne({nombre: 'Femenino', grupo: 'GENERO', idProceso: req.query.idTipoProceso});
      } else {
        paramVictima =await ParametroService.findOne({nombre: 'VICTIMA', grupo: 'TIPO_PARTICIPANTE_SLIM', idProceso: req.query.idTipoProceso});
        paramDenunciado =await ParametroService.findOne({nombre: 'DENUNCIADO', grupo: 'TIPO_PARTICIPANTE_SLIM', idProceso: req.query.idTipoProceso});
        paramGeneroMasculino = await ParametroService.findOne({nombre: 'Masculino', grupo: 'SEXO_SLIM_GAMEA', idProceso: req.query.idTipoProceso});
        paramGeneroFemenino = await ParametroService.findOne({nombre: 'Femenino', grupo: 'SEXO_SLIM_GAMEA', idProceso: req.query.idTipoProceso});
      }



      const arr = [];
      for (let i = 0; i < rows.length; i++) {
          const elm = rows[i];
          let strDelito = '';
          for (let z = 0; z < elm.delitos.length; z++) {
            const del = elm.delitos[z];
            strDelito += '* '+del.nombre+' ';
          }
          let sexoVictima = '';
          let nombreVictima = '';
          let edadVictima = '';
          let edadVictimaMeses = '';
          let nombreDenunciado = '';
          let edadDenunciado = '';
          for (let z = 0, y = 0, x = 0; z < elm.participantes.length; z++) {
            const part = elm.participantes[z];
            const participante = await ParticipanteService.findOne({id: part.id});
            if (paramVictima.id == participante.idTipoParticipante) {
              edadVictima += participante.edad ? (y+1)+'.- '+participante.edad+' ' : '';
              edadVictimaMeses += participante.edadMeses ? (y+1)+'.- '+participante.edadMeses+' ' : '';
              nombreVictima += participante.nombreCompleto ? (y+1)+'.- '+participante.nombreCompleto+' ' : '';
              sexoVictima += participante.idGenero == paramGeneroMasculino.id ? (y+1)+'.- '+paramGeneroMasculino.nombre+' ' : participante.idGenero == paramGeneroFemenino.id ? (y+1)+'.- '+paramGeneroFemenino.nombre+' ': '';
              y+=1;
            }
            if (paramDenunciado.id == participante.idTipoParticipante) {
              edadDenunciado += participante.edad ? (x+1)+'.- '+participante.edad+' ' : '';
              nombreDenunciado += participante.nombreCompleto ? (x+1)+'.- '+participante.nombreCompleto+' ' : '';
              x+=1;
            }
          }

          // const {rows: orientacion} = await SeguimientoService.listar({idDenuncia: elm.id, nombreEtapaRol: ORIENTACION, ...data});
          const {rows: social} = await SeguimientoService.listar({idDenuncia: elm.id, nombreEtapaRol: SOCIAL, ...data});
          const {rows: psicologia} = await SeguimientoService.listar({idDenuncia: elm.id, nombreEtapaRol: PSICOLOGIA, ...data});
          const {rows: patrocinio} = await SeguimientoService.listar({idDenuncia: elm.id, nombreEtapaRol: PATROCINIO, ...data});

          arr.push([
            1+i,
            elm.correlativoGamea,
            elm.fechaIngreso,
            elm.fechaDenuncia,
            strDelito,
            sexoVictima,
            edadVictima + '-' + edadMeses,
            nombreVictima,
            edadDenunciado,
            nombreDenunciado,
            strDelito,
            elm.juez,
            elm.fiscal,
            elm.estadoActual,
            social.length>0?social[0].actuacion:'',
            psicologia.length>0?psicologia[0].actuacion:'',
            patrocinio.length>0?patrocinio[0].actuacion:'',
            elm.observaciones
          ]);
      }

      arr.forEach((row) => {
          worksheet.addRow(row);
      });

      res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return workbook.xlsx.write(res);

    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function generarExcelDescartado (req, res) {
    const rootPath = config.app.path;
    try {
      /* const tienePermiso = await PermisoService.verificarPermisos(req.user.idRoles, ['denuncia:listar:todo']);
      if (!tienePermiso) req.query.idUsuarioAsignado = req.user.idUsuario; */
      const { rows } = await DenunciaService.filtradoAvanzado(req.query);
      // const formato = await DenunciaService.formatearJson(rows); 
      /*  for (const row of rows) {
        const maximo = Math.max(row.participantes.length, row.delitos.length);
        // datosFormateados += `<tr id="data-table-A1" rowspan="${maximo}">${row.codigoDenuncia}</tr>`;
        datosFormateados += `${row.codigoDenuncia}`;
      } */
      const html = await ejs.renderFile(`${rootPath}/../../views/pdf.ejs`, {});
      const worksheet = XLSX.utils.table_to_sheet(html,{});
        console.log(worksheet);
      // const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'REPORTE');
      const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      // Enviar el archivo XLSX en la respuesta
      res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(xlsxBuffer);
      /* const settings = {
        fileName     : 'Denuncias',
        extraLength  : 3,
        writeOptions : {
          type     : 'buffer',
          bookType : 'xlsx'
        }
      }; */

      // const buffer = xlsx(data, settings);
      // res.writeHead(200, {
      //   'Content-Type'        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //   'Content-disposition' : 'attachment; filename=Empleados.xlsx'
      // });
      // res.end(buffer);
      //return res.status(200).send(new Respuesta('OK', Finalizado.OK, true));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteBienesCautelados (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteBienesCautelados(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reportePenasImpuestas (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reportePenasImpuestas(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteSoloDelitosPrecedentes (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteSoloDelitosPrecedentes(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteSentenciasLGI (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteSentenciasLGI(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteBienesDecomisados (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteBienesDecomisados(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteBienesConfiscados (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteBienesConfiscados(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function reporteBienesIncautados (req, res) {
    try {
      const datos = req.query;
      const respuesta = await DenunciaService.reporteBienesIncautados(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function concluirDenuncia (req, res) {
    try {
      debug('Reasignando denuncia');
      const { id } = req.params;
      const datos = {
        id,
        casoConcluido              : true,
        idTipoConclusion           : req.body.idTipoConclusion,
        idTipoConclusionHijo       : req.body.idTipoConclusionHijo,
        justificacionCasoConcluido : req.body.justificacionCasoConcluido,
        fechaConclusion            : new Date(),
        userUpdated                : req.user.idUsuario
      };
      const respuesta = await DenunciaService.concluirDenuncia(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function seguimientoSaj (req, res) {
    try {
      debug('Seguimiento saj');
      const {codigosaj} = req.params;
      const respuesta = await DenunciaService.seguimientoSaj(codigosaj);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }
  
  async function datosSaj (req, res) {
    try {
      debug('Datos saj');
      const {codigosaj} = req.params;
      const respuesta = await DenunciaService.datosSaj(codigosaj);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizarSaj (req, res) {
    try {
      debug('Actualizar saj');
      const {codigosaj} = req.params;
      const respuesta = await DenunciaService.actualizarSaj(req.body, codigosaj);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function sucursalesSaj (req, res) {
    try {
      debug('Sucursales saj');
      const respuesta = await DenunciaService.sucursalesSaj();
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function habilitarTrabajoSocial (req, res) {
    try {
      debug('Habilitar trabajo social');
      const { id } = req.params;
      const datos = {
        idDenuncia: id,
        idUsuarioAsignado: req.body.idUsuarioAsignado,
      };
      const respuesta = await DenunciaService.habilitarTrabajoSocial(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function contadoresDashboard (req, res) {
    try {
      debug('Contadores');
      const {IDPROCESODEFENSORIA,IDPROCESOSLIM} = TIPOPROCESO;

      const denunciasSlim = await DenunciaService.contarDenuncias(IDPROCESOSLIM);
      const denunciasDefensoria = await DenunciaService.contarDenuncias(IDPROCESODEFENSORIA);
      const usuarios = await UsuarioService.contarUsuarios();

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, {
        denunciasSlim,
        denunciasDefensoria,
        usuarios
      }));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    sucursalesSaj,
    actualizarSaj,
    datosSaj,
    seguimientoSaj,
    reporteBienesConfiscados,
    reporteBienesIncautados,
    concluirDenuncia,
    reporteBienesDecomisados,
    reporteSentenciasLGI,
    reporteSoloDelitosPrecedentes,
    reportePenasImpuestas,
    reporteBienesCautelados,
    generarExcel,
    filtradoAvanzado,
    getFiltrosReporte,
    reporteAvanzadoLGIFT,
    reporteDenuncia,
    reportesDenuncia,
    cerrarDenuncia,
    reasignar,
    reporte,
    listar,
    eliminar,
    actualizar,
    crear,
    mostrar,
    habilitarTrabajoSocial,
    contadoresDashboard
  };
};
