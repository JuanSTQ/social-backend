const mysql = require('mysql')
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
  connection = mysql.createConnection(dbconf)
  connection.connect((err)=>{ //middleware para el error
    if(err){
      console.log("[db::ERROR] " + err);
      setTimeout(handleConnect,2000)
    }else {
      console.log('DB CONNECTED')
    }
  })
  //SI YA EXISTE UN CONEXION ↓ CON LO SIGUIENTE CAPTURAMOS CUALQUIER ERROR QUE SUCEDE DURANTE LA CONEXION
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

function list(table){
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT * FROM ${table}`, (err,data)=>{
    console.log(data)
    err ? reject(err):resolve(data) 

  }) 
  })
}

function upsert(table, data){
  return new Promise((resolve,reject)=>{
    connection.query(`INSERT INTO ${table} SET ?`, data, (err,result)=>{
      err ? reject(err) : resolve(result)
    })
  })
}
function update(table, data){
  return new Promise((resolve,reject)=>{
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data,data.id], (err,result)=>{
      console.log('result::')
      console.log(result)
      err ? reject(err) : resolve(result)
    })
  })
} 
function query(table, query, join){
  let joinQuery = "";
  if(join){
    const key = Object.keys(join)[0];
    const value = join[key];
    //UNIR TABLA DE USER CON LA DE USERFOLLOW CON USERTO
    joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
  } 
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err,result)=>{
      if(err){
        reject(err)
      }
      const resultARR = result.map((user)=>{
        const formatjwt = {}
        for(let prop in user){
          formatjwt[prop] = user[prop]
        }
        return formatjwt
      })
      resolve(resultARR)
    })
  })
}


module.exports = {
    get,
    list,
    upsert,
    update,
    query,
}