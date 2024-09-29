const ValidateJS = require('validate.js');
const multipleMensajes = false;

ValidateJS.validators.requerido = function (value, options, key, attributes) {
  if (!value) {
    return `^El campo ${key} es requerido.`;
  }
};

ValidateJS.validators.uuid = function (value, options, key, attributes) {
  if (!(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value))) {
    return `^El campo ${key} no es un id valido.`;
  }
};

const SchemaMiddleware = function (services) {
  function validarSchema (schema) {
    return async function _middleware (req, res, next) {
      const resultadoValidacion = ValidateJS(req.body, schema);

      if (!resultadoValidacion) {
        return next();
      }

      const errores = [];

      for (const key in resultadoValidacion) {
        for (const error of resultadoValidacion[key]) {
          if (multipleMensajes) {
            errores.push(error);
          } else {
            return res.status(412).json({
              finalizado : false,
              mensaje    : resultadoValidacion[key][0],
              data       : null
            });
          }
        }
      }

      if (multipleMensajes) {
        return res.status(412).json({
          finalizado : false,
          mensaje    : errores,
          data       : null
        });
      }
    };
  }

  return {
    validarSchema
  };
};

module.exports = function (services) {
  return new SchemaMiddleware(services);
};
