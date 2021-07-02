const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret; 
const error = require('../utils/error')

function sign(data){
  return jwt.sign(data,secret); //firma para codificar la data
}     
function verify(token){
  return jwt.verify(token, secret) //firma para decodificar data 
}

const check = {
  own: function check(req,owner){
    const decoded = decodeHeader(req) 
    console.log(decoded)
    //comprobar si owner es el mismo user autenticado
    if(decoded.id !== owner){
      throw error('No tienes permisos para hacer esta accion', 401)
    }

  }
}
function getToken(auth){
  if(!auth){
    throw new Error('No existe el token')
  }
  if(auth.indexOf('Bearer')===-1){
    throw new Error('Formato invalido')
  }
  let token = auth.replace('Bearer ', '');
  return token
}

function decodeHeader(req){
  const authorization = req.headers.authorization || "";//tiene el token pero en un formato no correcto
  console.log('auth:  ' + authorization)
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}
module.exports = {
  sign,
  check,
}