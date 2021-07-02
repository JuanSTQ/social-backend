const TABLA = 'user'
const {nanoid} = require('nanoid')
const auth = require('../auth');
const secure = require('./secure')

module.exports =  function(injectedStore){
  let store = injectedStore
  if(!store){
    store = require('../../../store/dummy')
  }
  function list(){
    return store.list(TABLA)
  }
  function get(id){
    return store.get(TABLA,id)
  }
  function remove(id){
    return store.remove(TABLA,id)
  }
  async function send(user){
    const format = {
      name: user.name,
      username: user.username
    }
    !user.id ? format.id=nanoid() : format.id = user.id 
    if(user.password||user.username){
      await auth.upsert({ //Creando una auth
        id: format.id,
        username: user.username,
        password: user.password
      })
    }
    return store.upsert(TABLA,format)
  }

  function update(id, data){

    const format = {}
    for(let prop in data){
      format[prop] = data[prop]
    }
    !format.id && (format.id  = nanoid())
    return store.update(TABLA,id,format)
  }
  return {
    list, 
    get,
    remove,
    send,
    update,
  }  
}

