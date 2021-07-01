const express = require('express');
const response = require("../../../network/response")
const router = express.Router();
const controller = require('./index')

router.get('/', (req,res)=>{
  controller.list()
    .then(list=>{
      response.success(req,res,list, 200)
    })
    .catch(err=>{
      response.error(req,res,err, 500)
    })
})
  
  router.get('/:id', function(req,res){
    controller.get(req.params.id)
    .then(user=>{
      response.success(req,res,user,200)
    })
    .catch(err=>{
      response.error(req,res,err, 500)
  })

})
  router.delete('/:id', function(req,res){
    console.log(req.params.id)
    controller.remove(req.params.id)
      .then(list=>{
        response.success(req,res,list, 200)
      })
      .catch(err=>{
        response.error(req,res,err,400)
      })
  })

  router.post('/', function(req,res){
    controller.send(req.body.user)
      .then(newuser=>{
        response.success(req,res,newuser, 201)
      })
      .catch(err=>{
        response.error(req,res,err,500)
      })
  })

  router.put('/:id', (req,res)=>{
    controller.update(req.params.id, req.body.user)
      .then(user=>{
        response.success(req, res, user, 200)
      })
      .catch(err=>{
        response.error(req,res,err,501)
      })
      
  })
  

module.exports = router