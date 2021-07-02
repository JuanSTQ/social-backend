const ctrl = require('./controller');
const store = require('../../../store/mysql');

module.exports = ctrl(store); //El objetivo es inyectar el store en lugar de meterlo dentro de archivo
