const TABLA = 'user'
const {nanoid} = require('nanoid')
const auth = require('../auth');


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
      if(prop !== "password" && prop !== "id"){
        format[prop] = data[prop]
      }
    }
    !format.id && (format.id  = id)
    return store.update(TABLA,format)
  }
  function follow(from,to){
    const format = {
      user_from: from,
      user_to: to,
    }
    return store.upsert(TABLA+"_follow",format)
  }

  async function followList(id){
    const join = {}
    join[TABLA] = 'user_to'; // { user: 'user_to' }
    const query = { user_from: id };
    return await store.query(TABLA + '_follow', query, join);
  }

  return {
    list, 
    get,
    remove,
    send,
    update,
    follow,
    followList,
  }  
}

