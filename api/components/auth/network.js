const express = require('express');
const response = require("../../../network/response")
const router = express.Router();
const controller = require('./index')
  
router.post('/login', function(req,res){
  controller.login(req.body.username, req.body.password)
    .then(token=>{
      //req.headers.authorization = token
      response.success(req,res,token,200)
    })  
    .catch(err=>{
      response.error(req,res,err,400)
    })
})

module.exports = router