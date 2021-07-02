function err(message, code){
  let e = new Error(message); //Me devuelve un objeto
  if(code){
    e.statusCode = code; //Pisamos el prop de obtuvimos del objeto new Error()
  }
  
  return e
}

module.exports = err