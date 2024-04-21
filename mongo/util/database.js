
const mongodb= require('mongodb')
const MongoClient = mongodb.MongoClient

let db;

const Mongoconnect= (callback) =>{
MongoClient.connect('mongodb+srv://ruchitakb7:lK3IZq9kQI689Vmf@cluster0.7iolqg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(client =>{
  console.log('connected')
  db=client.db()
  callback()
})
.catch(e=>{
  console.log(e)
  throw e
})
}

const getdb= () =>{
  if(db) 
  {
    return db
  }
  throw 'no datacase'
}

module.exports= Mongoconnect
exports.getdb=getdb