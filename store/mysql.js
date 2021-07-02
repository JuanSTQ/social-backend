const myslq = require('mysql')
const config = require('../config')


const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

//Connect!!
let connection;

function handleConnect(){
  connection = myslq.createConnection(dbconf)
  connection.connect((err)=>{ //middleware para el error
    if(err){
      console.log("[db::ERROR] " + err);
      setTimeout(handleConnect,2000)
    }else {
      console.log('DB CONNECTED')
    }
  })
  connection.on('error', err=>{
    console.log("[db::ERROR] " + err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleConnect();
    }else{
      throw err
    }
  })
}
handleConnect();


//YA CONECTADO CONNECT ES UN OBJ QUE TIENE TODAS LAS FUNCIONALIDADES PARA LEER,ACTUALIZAR, ELIMINAR DATOS
function get(table,id){
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err,data)=>{
      err ? reject(err):resolve(data)
    })
  })
}
 module.exports = {
   get,
 }