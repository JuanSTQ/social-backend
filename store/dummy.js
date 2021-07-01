const db = {
  user: [{name:'Juan', id:"18"}, {name:'Carlos', id: "20"}, {name: 'Elmen', id: "10"}]
};
async function list(tabla){ //Solo con indicar la feuture ASYNC ya devuelve una promesa por lo tanto en la capa de cocntroller
  //podemos capturarlo con un then, catch
  return db[tabla]
}
function get(tabla, id){
  return new Promise((resolve,reject)=>{
    list(tabla)
      .then(list=>{
        resolve(list.filter((user)=>user.id===id))
      })
      .catch(err=>{
        reject(err)
      })
  })
}
async function upsert(table,data){
  
  let referenceList = await list(table) //estamos sobre el array, puedo mutar mas no asignar nuevo arr
  if(!referenceList){
    db[table] = [];
    referenceList = await list(table)
  }
  referenceList.push(data)
  return referenceList  
}
async function remove(tabla, id){
  //db.user.splice(db.user.indexOf((user)=> user.id==="18"), 1) 
  db[tabla] = db[tabla].filter(user=>user.id!==id) //estamos sobre el objeta, puedo mutar por ende puedo asignar un nuevo arr
  return db[tabla]
}

async function update(tabla, id, data){
   const referenceList = await list(tabla)
   //referenceList[0] = {} modelo de mutacion
   const index = referenceList.findIndex((user)=>{return user.id === id})

   referenceList[index] = data

   return referenceList
}

async function query(tabla, query){
  const listAuth = await list(tabla)
  const key = Object.keys(listAuth)[0] //Extraer la primera propiedad del query
  return listAuth.filter((user)=>{return user[key] === query[key]})[0] || null
}

module.exports = {
  list,
  get,
  upsert, 
  remove,
  update,
  query,
}

