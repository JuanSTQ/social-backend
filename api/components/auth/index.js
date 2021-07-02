const ctr = require('./controller') //function
const store = require('../../../store/mysql')
module.exports = ctr(store)