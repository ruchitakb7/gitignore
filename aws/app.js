const express= require('express');
const app= express();

const path=require('path');

const seq = require('./util/database');

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public"))) 



const routerfile= require('./routes/forms');   
 app.use(routerfile);

 app.use('/home',(req,res,next)=>{
   res.render('home')
 })


seq.sync()
.then(res=>
   { app.listen(1339);  
})                               
.catch((e)=>{
   console.log(e)
})
