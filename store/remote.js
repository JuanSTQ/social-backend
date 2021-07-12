const request = require('request');
//peticiones forzadas
function createRemoteDB(host,port){ //el host y port de nuestro microservicio
  const URL = 'http://'+ host + ':' + port;
  function list(table){
    return req('GET', table)
  }
  function get(table, id){
    return req('GET', table, id);
  }
  function upsert(table,data){
    return req('POST', table, data)
  }
  function update(table, data){
    return req('PUT', table, data)
  }
  function query(table, query, join){
    const format = {
      query: query,
      join: join,
    }
    return req('POST',table, format)
  }
  function req(method, table, data){
    let url = URL + '/' + table;
    let body = '';
    if(typeof data !== 'object' && data){
      url += `/${data}`
      console.log(typeof data)
    }else if(data){
      body= JSON.stringify(data)
      const urlExtra = Object.keys(data)[0]
      urlExtra === "query" && (url += "/details")
    }
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
    get,
    upsert,
    update,
    query,
  }
}
module.exports = createRemoteDB