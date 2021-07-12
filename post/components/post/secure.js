const auth = require('../../../auth/index')
module.exports = function checkAuth(action){
    return function middleware(req,res,next){
      switch(action){
        case "post": 
          auth.check.logged(req);
          next()
          break;
        default:
          next() 

      }
    }
}