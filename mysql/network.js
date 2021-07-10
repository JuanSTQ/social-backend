//Crearemos un network que me permita manejar todas la tablas que nosotros tenemos
const express = require('express');

const response = require("../network/response")
const router = express.Router();
const store = require('../store/mysql')

router.get('/:table', list);
router.get('/:table/:id', get)
router.post('/:table', insert)
router.post('/:table', upsert)
//En este caso no llamaremos directamente al controllador sino al store
async function list(req,res,next){
  const datos = await store.list(req.params.table)
  response.success(req,res,datos,200)
}
async function get(req,res,next){
  const datos = await store.get(req.params.table, req.params.id)
  response.success(req,res,datos,200)
}
async function insert(req,res,next){
  const datos = await store.upsert(req.params.table, req.body)
  response.success(req,res,datos,200)
}
async function upsert(req,res,next){
  const datos = await store.update(req.params.table, req.body)
  response.success(req,res,datos,200)
}

module.exports = router