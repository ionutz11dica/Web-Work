const express = require('express');
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
app.use(cors());

const usersRoutes = require('./api/routes/users');
const booksRoutes = require('./api/routes/books');
const reviewsRoutes = require('./api/routes/reviews');

const mongoURL ='mongodb://books:'+ process.env.MONGOLAB_PW +'@ds049219.mlab.com:49219/licenta2019';

mongoose.createConnection(mongoURL ,{ useNewUrlParser:true },(err,database)=>{
   if(err){
     return console.log(err)
   } else{
       
       console.log('MongoDB is connected')
   } 
   
 });
 mongoose.set('useCreateIndex', true);


//  const connection = mongoose.createConnection(mongoURL,{ useNewUrlParser:true });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })

//   app.all("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
//   });

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
});

 module.exports = app;


