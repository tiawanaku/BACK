'use strict';

const { ErrorApp } = require('../../lib/error');
const moment = require('moment');
const { generateToken } = require('../../../application/lib/auth');

module.exports = function userService (repositories, helpers, res) {
  const { ProcesoRepository, UsuarioRepository, RolUsuarioRepository, AuthRepository, RolRepository, transaction, ParametroRepository, usuarioDefensoriaRepository, UsuarioSlimRepository } = repositories;

  async function listarUsuarios (params) {
    try {
      if (params.idProceso) {
        const { rows } = await ProcesoRepository.findRoles(params.idProceso);
        const idRoles = rows.map(x => x.id);
        params.idRoles = idRoles;
      }
      return UsuarioRepository.findAll(params);
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function mostrar (id) {
    try {
      return UsuarioRepository.findOne({ id });
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function reestablecerContrasena (idUsuario) {
    try {
      const existeUsuario = await UsuarioRepository.findById(idUsuario);
      if (!existeUsuario) {
        throw new Error('No existe el usuario.');
      }
      await UsuarioRepository.createOrUpdate({
        id         : existeUsuario.id,
        contrasena : await AuthRepository.codificarContrasena(existeUsuario.numeroDocumento)
      });
      return true;
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function getResponse (user, seleccionarRol, info = {}) {
    let respuesta;
    try {
      const usuario = user.usuario;
      // Actualizando el último login
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      let text = '';
      if (info.location) {
        text += `Location: ${info.location.country} -- ${info.location.city} <br />`;
      }
      if (info.navigator) {
        text += `Navigator: ${info.navigator}`;
      }

      const where = {};
      if (seleccionarRol) {
        where.id = seleccionarRol;
      } else {
        // where.ciudadano = true; No existe la columna ciudadano en el tabla rol
        where.id = 1;
      }
      let idRolSeleccionado = await RolRepository.findOne(where);
      if (!idRolSeleccionado) {
        throw new Error('El rol seleccionado no existe.');
      }
      idRolSeleccionado = idRolSeleccionado.id;
      const rolSeleccionado = user.roles.find(x => x.id === idRolSeleccionado);
      if (!rolSeleccionado) {
        throw new Error('No tiene asignado el rol que selecciono.');
      }
      const menu = rolSeleccionado.menus;
      const listaRoles = user.roles.map(x => {
        return {
          id          : x.id,
          nombre      : x.nombre,
          descripcion : x.descripcion
          // ciudadano   : x.ciudadano,
          // admin       : x.admin
        }
        ;
      });
      // menu = menu.data.menu;
      // Generando token
      const token = await generateToken(ParametroRepository, {
        id        : user.id,
        user      : user.usuario,
        rol       : rolSeleccionado.id,
        state     : info.state,
        idPersona : user.idPersona,
        idEmpresa : user.idEmpresa ? user.idEmpresa : null
      });
      respuesta = {
        roles   : listaRoles,
        menu,
        token,
        usuario : {
          usuario          : user.usuario,
          nombres          : user.nombres,
          primer_apellido  : user.primerApellido,
          segundo_apellido : user.segundoApellido,
          email            : user.email,
          rol              : rolSeleccionado.nombre,
          idEmpresa        : user.idEmpresa ? user.idEmpresa : null,
          lang             : 'es'
        },
        redirect: rolSeleccionado.path
      };
      return respuesta;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function userExist (usuario, contrasena, nit) {
    let result;
    let t;
    try {
      result = await UsuarioRepository.login({ usuario });
      if (!nit && !result) {
        throw new ErrorApp(`No existe el usuario ${usuario}`, 400);
      }

      const respuestaVerificacion = await AuthRepository.verificarContrasena(contrasena, result.contrasena);
      if (!nit && !respuestaVerificacion) {
        throw new ErrorApp(`La contraseña del usuario ${usuario} es incorrecta`, 400);
      }

      if (result.estado === 'INACTIVO') {
        throw new ErrorApp(`El usuario ${usuario} se encuentra deshabilitado. Consulte con el administrador del sistema.`, 400);
      }

      return result;
    } catch (e) {
      if (t) {
        await transaction.rollback(t);
      }

      throw new ErrorApp(e.message, 400);
    }
  }

  async function createOrUpdate (data) {
    let transaccion;
    try {
      transaccion = await transaction.create();

      if (data.id) delete data.contrasena;

      if (data.contrasena) {
        data.contrasena = await AuthRepository.codificarContrasena(data.contrasena);
      }

      const existeUsuario = await UsuarioRepository.verificarCorreoElectronico({
        id                : data.id,
        correoElectronico : data.correoElectronico,
        usuario           : data.usuario
      }, transaccion);

      if (existeUsuario) {
        if (existeUsuario.correoElectronico === data.correoElectronico) {
          throw new Error(`Ya se encuentra registrado un usuario con el correo electronico "${data.correoElectronico}".`);
        }

        if (existeUsuario.usuario === data.usuario) {
          throw new Error(`Ya se encuentra registrado un usuario con el nombre de usuario "${data.usuario}".`);
        }
      }

      delete data.createdAt;

      const usuarioCreado = await UsuarioRepository.createOrUpdate(data, transaccion);

      if (data.slims) {

        const {rows} = await UsuarioSlimRepository.findAll({idUsuario: usuarioCreado.id});
        
        const eliminar = rows.filter( elm=> !data.slims.includes(elm.idParametroSlim));
        const agregar = data.slims.filter( elm => !rows.some(elm2=> elm2.idParametroSlim == elm));
        

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await UsuarioSlimRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await UsuarioSlimRepository.createOrUpdate({
            idUsuario       : usuarioCreado.id,
            idParametroSlim : elm,
            userCreated     : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      if (data.defensorias) {

        const {rows} = await usuarioDefensoriaRepository.findAll({idUsuario: usuarioCreado.id});
        
        const eliminar = rows.filter( elm=> !data.defensorias.includes(elm.idParametroDefensoria));
        const agregar = data.defensorias.filter( elm => !rows.some(elm2=> elm2.idParametroDefensoria == elm));

        for (let z = 0; z < eliminar.length; z++) {
          const elm = eliminar[z];
          await usuarioDefensoriaRepository.deleteItem(elm.id, transaccion);
        }

        for (let z = 0; z < agregar.length; z++) {
          const elm = agregar[z];
          await usuarioDefensoriaRepository.createOrUpdate({
            idUsuario             : usuarioCreado.id,
            idParametroDefensoria : elm,
            userCreated           : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      if (data.roles) {
        if (data.roles.length === 0) throw new Error('Debe asignar al menos un rol al usuario');
        await RolUsuarioRepository.deleteItemCond({
          idUsuario   : usuarioCreado.id,
          userDeleted : data.userCreated || data.userUpdated
        }, transaccion);
        for (const rol of data.roles) {
          await RolUsuarioRepository.createOrUpdate({
            idUsuario   : usuarioCreado.id,
            idRol       : rol.id,
            userCreated : data.userCreated || data.userUpdated
          }, transaccion);
        }
      }

      await transaction.commit(transaccion);
      return usuarioCreado;
    } catch (error) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(error.message, 400);
    }
  }

  async function cambiarContrasena (data) {
    try {
      const existeUsuario = await UsuarioRepository.findById(data.id);
      if (!existeUsuario) {
        throw new Error('No existe el usuario.');
      }

      const respuestaVerificacion = await AuthRepository.verificarContrasena(data.antiguaContrasena, existeUsuario.contrasena);
      if (!respuestaVerificacion) {
        throw new Error('Su contraseña anterior no coincide.');
      }

      await UsuarioRepository.createOrUpdate({
        id         : existeUsuario.id,
        contrasena : await AuthRepository.codificarContrasena(data.nuevaContrasena)
      });
      return true;
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function eliminar (params) {
    try {
      return UsuarioRepository.deleteItemCond(params);
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function asignarRoles (data) {
    try {
      const { idUsuario, roles } = data;
      await RolUsuarioRepository.eliminarRolesAsociados(idUsuario);
      await RolUsuarioRepository.crearRolesAsociados(idUsuario, roles);
      return true;
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function findOne (idUsuario) {
    try {
      const usuario = await UsuarioRepository.findOne({id: idUsuario});
      return usuario;
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function contarUsuarios () {
    try {
      const respuesta = await UsuarioRepository.findCount();
      return respuesta;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findOne,
    reestablecerContrasena,
    getResponse,
    cambiarContrasena,
    asignarRoles,
    listarUsuarios,
    mostrar,
    createOrUpdate,
    eliminar,
    userExist,
    contarUsuarios
  };
};
