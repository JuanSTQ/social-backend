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
  

module.exports = router