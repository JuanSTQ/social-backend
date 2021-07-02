exports.success = function(req,res,message,status){
  const statusMessage = message || ""
  res.status(status).send({
    error: false,
    status: status,
    body: message
  })
}

exports.error = function(req,res,message,status){
  let statusCode = status || 500
  const statusMessage = message || "Internal Error"
  res.status(statusCode).send({
    body: [],
    error: statusMessage,
    status: statusCode,
  })
}


/* const user = require('../api/components/user/network')

function routes(app){
  app.use('/api/user', user)
}

module.exports = {
  routes
} */