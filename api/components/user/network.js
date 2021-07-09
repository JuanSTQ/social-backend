const express = require('express');
const secure = require('./secure');
const response = require("../../../network/response")
const router = express.Router();
const controller = require('./index')
router.get('/', (req,res, next)=>{
  controller.list()
    .then(list=>{
      response.success(req,res,list, 200)
    })
    .catch(next);
})
  
  router.get('/:id', function(req,res,next){
    controller.get(req.params.id)
    .then(user=>{
      response.success(req,res,user,200)
    })
    .catch(err=>{
      response.error(req,res,err, 500)
  })

})
  router.get('/follows/:id', (req,res,next)=>{
    controller.followList(req.params.id)
      .then(list=>{
        response.success(req,res,list, 200)
      })
      .catch(next)
  })

  router.delete('/:id', function(req,res,next){
    console.log(req.params.id)
    controller.remove(req.params.id)
      .then(list=>{
        response.success(req,res,list, 200)
      })
      .catch(err=>{
        response.error(req,res,err,400)
      })
  })

  router.post('/', function(req,res,next){
    controller.send(req.body.user)
      .then(newuser=>{
        response.success(req,res,newuser, 201)
      })
      .catch(err=>{
        response.error(req,res,err,500)
      })
  })

  router.put('/:id', secure('update'), (req,res,next)=>{ //ejecutamos secure, y devolvemos nuestro middleware a nuestro router.put('/')
    controller.update(req.params.id, req.body.user) //middleware se ejecuta cuando suceda el method y le envia el req, res de manera automatica
      .then(user=>{
        response.success(req, res, user, 200)
      })
      .catch(err=>{
        response.error(req,res,err,501)
      })
      
  })
  
  router.post('/follow/:id', secure('follow'), (req,res,next)=>{ //el usuario que hara la accion debe estar autenticado
    //req.user.id → el id del usuario que esta yendo seguir a req.params.id
    //req.params.id →  el id del ususario al que queremos seguir
    console.log(req.user.id)
    controller.follow(req.user.id, req.params.id) 
      .then(result=>{
        response.success(req,res,result,200)
      })
      .catch(next) //app.use(router) → app.use(err)
  })


module.exports = router