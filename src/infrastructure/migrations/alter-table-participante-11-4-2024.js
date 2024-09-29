'use strict';

const tableName = 'participante';
const lang = require('../lang');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
      .then(async tableDefinition => {

          if (!tableDefinition.fecha_nacimiento) {
            await queryInterface.addColumn(tableName, 'fecha_nacimiento', {
                type         : Sequelize.DATEONLY,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'fechaNacimiento',
                field        : 'fecha_nacimiento'
            });
          }

          if (!tableDefinition.id_nacimiento_slim) {
            await queryInterface.addColumn(tableName, 'id_nacimiento_slim', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idNacimientoSlim',
                field        : 'id_nacimiento_slim'
            });
          }

          if (!tableDefinition.especifique_nacimiento) {
            await queryInterface.addColumn(tableName, 'especifique_nacimiento', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'especifiqueNacimiento',
                field        : 'especifique_nacimiento'
            });
          }

          if (!tableDefinition.id_residencia_habitual) {
            await queryInterface.addColumn(tableName, 'id_residencia_habitual', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idResidenciaHabitual',
                field        : 'id_residencia_habitual'
            });
          }

          if (!tableDefinition.especifique_residencia) {
            await queryInterface.addColumn(tableName, 'especifique_residencia', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'especifiqueResidencia',
                field        : 'especifique_residencia'
            });
          }

          if (!tableDefinition.id_relacion_denunciado) {
            await queryInterface.addColumn(tableName, 'id_relacion_denunciado', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idRelacionDenunciado',
                field        : 'id_relacion_denunciado'
            });
          }

          if (!tableDefinition.hijos) {
            await queryInterface.addColumn(tableName, 'hijos', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'hijos',
                field        : 'hijos'
            });
          }

          if (!tableDefinition.educativo_especifique) {
            await queryInterface.addColumn(tableName, 'educativo_especifique', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'educativoEspecifique',
                field        : 'educativo_especifique'
            });
          }

          if (!tableDefinition.id_condiciones_actividad) {
            await queryInterface.addColumn(tableName, 'id_condiciones_actividad', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idCondicionesActividad',
                field        : 'id_condiciones_actividad'
            });
          }

          if (!tableDefinition.condiciones_actividad_especifique) {
            await queryInterface.addColumn(tableName, 'condiciones_actividad_especifique', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'condicionesActividadEspecifique',
                field        : 'condiciones_actividad_especifique'
            });
          }

          if (!tableDefinition.id_ingreso_economico) {
            await queryInterface.addColumn(tableName, 'id_ingreso_economico', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idIngresoEconomico',
                field        : 'id_ingreso_economico'
            });
          }

          if (!tableDefinition.ingreso_economico_especifique) {
            await queryInterface.addColumn(tableName, 'ingreso_economico_especifique', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'ingresoEconomicoEspecifique',
                field        : 'ingreso_economico_especifique'
            });
          }

          if (!tableDefinition.id_idioma_hablado) {
            await queryInterface.addColumn(tableName, 'id_idioma_hablado', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idIdiomaHablado',
                field        : 'id_idioma_hablado'
            });
          }

          if (!tableDefinition.departamento) {
            await queryInterface.addColumn(tableName, 'departamento', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'departamento',
                field        : 'departamento'
            });
          }

          if (!tableDefinition.provincia) {
            await queryInterface.addColumn(tableName, 'provincia', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'provincia',
                field        : 'provincia'
            });
          }

          if (!tableDefinition.municipio) {
            await queryInterface.addColumn(tableName, 'municipio', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'municipio',
                field        : 'municipio'
            });
          }

          if (!tableDefinition.zona) {
            await queryInterface.addColumn(tableName, 'zona', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'zona',
                field        : 'zona'
            });
          }

          if (!tableDefinition.calle) {
            await queryInterface.addColumn(tableName, 'calle', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'calle',
                field        : 'calle'
            });
          }

          if (!tableDefinition.numero) {
            await queryInterface.addColumn(tableName, 'numero', {
                type         : Sequelize.TEXT,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'numero',
                field        : 'numero'
            });
          }

          if (!tableDefinition.id_estante) {
            await queryInterface.addColumn(tableName, 'id_estante', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'idGestante',
                field        : 'id_estante'
            });
          }

          if (!tableDefinition.tipo_trabajo) {
            await queryInterface.addColumn(tableName, 'tipo_trabajo', {
                type         : Sequelize.UUID,
                allowNull    : true,
                defaultValue : null,
                xlabel       : 'tipoTrabajo',
                field        : 'tipo_trabajo'
            });
          }

        return Promise.resolve();
      });
  }
};