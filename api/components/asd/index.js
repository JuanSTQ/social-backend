const user= {
  name: "juan",
  age: "18",
  novia: "Ninguna",
}
console.log(Object.keys(user))
for(let c in user){
  console.log(c)
}

const arr = [78,5,54,651]
console.log(arr.findIndex(num=>num===54))