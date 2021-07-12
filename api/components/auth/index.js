const ctr = require('./controller') //function
const store = require('../../../store/remote-mysql')
module.exports = ctr(store)