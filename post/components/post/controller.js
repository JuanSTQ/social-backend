const TABLA = 'post'
const {nanoid} = require('nanoid');
const err = require('../../../utils/error');


module.exports =  function(injectedStore){
  let store = injectedStore;
  if(!store){
    store=require('../../../store/mysql')
  }
  function list(data){
    if(!data.id && !data.user){
      return store.list(TABLA)
    }else{
      const format = {}
      data.id ? format.id = data.id : format.user = data.user
      return store.query(TABLA,format) 
    }
  }
  function send(post,userid){
    const format = {}
    for(let prop in post){
      if(prop!=="user"){
        format[prop] = post[prop]
      }
    }
    if(!format.id){
      format.id = nanoid()
    }
    format.user = userid;
    return store.upsert(TABLA,format)
  }
  async function update(postEdit, userid, idPost){
    const post = await store.query(TABLA,{id:idPost})
    console.log('POST--*****')
    console.log(post)
    console.log(userid)
    if(post[0].user !== userid){
      throw err("NO TIENES PERMISOS PARA ESTA ACCION", 401)
    }
    const format = {}
    format.text = postEdit.text;
    format.id = idPost;
    format.user = userid
    return store.update(TABLA, format)
  }
  return {
    list,
    send,
    update,
  }  
}

