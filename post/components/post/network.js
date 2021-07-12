const express = require('express');
const response = require("../../../network/response")
const router = express.Router();
const controller = require('./index')
const secure = require('./secure')
router.get('/', (req,res,next)=>{
  const id = req.query.id || null
  const user = req.query.user || null
  const data = {
    id:id,
    user:user,
  }
  controller.list(data)
    .then(list=>{
      response.success(req,res, list, 200)
    })
    .catch(next)
})

router.post('/', secure('post'),(req,res,next)=>{
  controller.send(req.body.post, req.user.id)
   .then(result=>{
     response.success(req,res,result,201)
   })
   .catch(next)
})

router.post('/:id', secure('post'), (req,res,next)=>{
  console.log('id')
  controller.update(req.body.post, req.user.id, req.params.id)
    .then(post=>{
      response.success(req,res,post, 201)
    })
    .catch(next)
})
module.exports = router