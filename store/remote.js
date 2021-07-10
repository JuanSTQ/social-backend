const request = require('request');
//peticiones forzadas
function createRemoteDB(host,port){ //el host y port de nuestro microservicio
  const URL = 'http://'+ host + ':' + port;
  function list(table){
    return req('GET', table)
  }
/*   function get(table,id){

  }
  function upsert(table,id){

  }
  function query(table, query, join){

  } */
  function req(method, table, data){
    let url = URL + '/' + table;
    body='';
    return new Promise((resolve,reject)=>{
      request({
        method,
        headers:{
          'content-type': 'application/json'
        },
        url,
        body,
      }, (err,req,body)=>{
        if(err){
          console.error("::ERROR CON LA BASE DE DATOS REMOTA:: " + err)
          return reject(err.message)
        }
        const resp = JSON.parse(body)
        return resolve(resp.body)
      })
    })
  }
  //NUESTRO CONTROLLER AHORA INTERACUTA CON ESTE OBJETO ↓
  return {
    list,
  }
}
module.exports = createRemoteDB