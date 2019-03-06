const express = require('express');
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./api/routes/users');
const booksRoutes = require('./api/routes/books');
const reviewsRoutes = require('./api/routes/reviews');

mongoose.connect('mongodb://books:'+ process.env.MONGOLAB_PW +'@ds049219.mlab.com:49219/licenta2019',{useNewUrlParser:true},(err,database)=>{
   if(err){
     return console.log(err)
   } else{
       console.log('MongoDB is connected')
   } 
   
 });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
  })

app.use('/users', usersRoutes);
app.use('/books', booksRoutes);
app.use('/reviews',reviewsRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, net)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

 module.exports = app;