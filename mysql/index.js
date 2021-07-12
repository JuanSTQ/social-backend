//crear un nuevo servidor para dicho microservicio
const express = require('express')
const config = require('../config')
const app = express();
const router = require('./network')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router)
app.listen(config.mysqlService.port, ()=>{
  console.log('Servicio de mysql escuchando en el puerto ' + config.mysqlService.port)
})