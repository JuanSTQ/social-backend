//crear un nuevo servidor para dicho microservicio - TENDRA EL MISMO COMPORTAMIENTO DE LA API
const express = require('express')
const config = require('../config')
const app = express();
const post = require('./components/post/network') 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/post', post)
app.listen(config.post.port, ()=>{
  console.log('Servicio de POST escuchando en el puerto ' + config.post.port)
})