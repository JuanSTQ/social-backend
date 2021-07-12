const express = require('express');
const app = express();
const config = require('../config')
const user = require('./components/user/network');
const auth = require('./components/auth/network')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const errors = require('../network/errors') 


// anteriormente - app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/user', user)
app.use('/api/auth', auth)
//app.use('/api/post', post) → MICROSERVICIO
const swaggerDocs = require("./swager.json")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(errors)
app.listen(config.api.port, ()=>{
  console.log('Api escuchamdp en el puerto: ' + `http://localhost:${config.api.port}` )
})
