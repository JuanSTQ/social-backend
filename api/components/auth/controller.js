const TABLA = 'auth'
const bcrypt = require('bcryptjs')
const {nanoid} = require('nanoid')
const auth = require('../../../auth')
module.exports =  function(injectedStore){
  let store = injectedStore
  if(!store){
    store = require('../../../store/dummy')
  }
  async function upsert(data){ //envia datos para la auth
    const authData = { //formato a la auth
      id: data.id,
    }
    if(data.username){
      authData.username=data.username
    }
    if(data.password){
      authData.password = await bcrypt.hash(data.password,5)
      console.log(authData.password)
    }
    return store.upsert(TABLA, authData)
  }
  async function login(username, password){
    const data = await store.query(TABLA, {username:username}) //query es nuestro obj a buscar
    console.log('data::')
    console.log(data)
    return bcrypt.compare(password, data[0].password)
      .then(Iguales=>{
        if(Iguales){
          return auth.sign(data[0])
        }else{
          throw new Error('Informacion Invalida')
        }
      })
  }

  
  return {
    upsert,
    login,
  }  
}

