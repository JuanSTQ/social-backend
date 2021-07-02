const auth = require('../../../auth')
module.exports = function checkAuth(action){
  function middleware(req,res,next){
    switch(action){
      case "update":
        const owner = req.params.id; //obtener la id del usuario a actualizar
        auth.check.own(req,owner); //le enviamos la informacion de la peticion ya que por medio de ello podemos verificar si el cliente se autentico, leer el token, decodificar el token
        next()//EJECUTA EL CONTROLLER QUE ES LA SIGUIENTE FUNCTION
        break;
      default: 
        next();
    }
  }
  return middleware
}