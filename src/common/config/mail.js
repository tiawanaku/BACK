'use strict';

const debug = require('debug')('apostilla:correo');

const correoConfig = {
  origen    : process.env.EMAIL_SENDER || 'test.tramites@justicia.gob.bo',
  host      : process.env.EMAIL_HOST || 'mail.justicia.gob.bo', // localhost en el test o prod
  port      : process.env.EMAIL_PORT || 587, // 25 en el test o prod
  secure    : false,
  ignoreTLS : false,
  auth      : {
    user : 'test.tramites@justicia.gob.bo', // Obligatorio para desarrollo
    pass : 'S1st3m4S.1236' // Obligatorio para desarrollo
  },
  tls: {
    rejectUnauthorized: false
  },
  logging: s => debug(s)
};

module.exports = correoConfig;
