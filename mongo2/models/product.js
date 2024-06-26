const mongodb= require('mongodb')
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id=id
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id)
    {
      dbOp=db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:this})
    }
    else{
      dbOp=  db
      .collection('products')
      .insertOne(this)
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId)
  {
    const db= getDb()
    return db
    .collection('products')
    .find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then((res)=>{
      console.log(res)
      return res
    })
    .catch(e=>{
       console.log(e)
    })
  }

   static deleteById(prodId)
   {
    const db= getDb()
    return db
    .collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then((res)=>{
      console.log(res)
    })
    .catch(e=>{
      console.log(e)
    })
   }
}

module.exports = Product;
