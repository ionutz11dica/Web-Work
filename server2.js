
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-plugin-autoinc')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// const api = require('./routes/api');
// app.use(app.router)
// app.use('/api',api);


let port = process.env.PORT || 4000;

var connection = mongoose.connect('mongodb://books:mafia001@ds049219.mlab.com:49219/licenta2019',{useNewUrlParser:true},(err,database)=>{
   if(err){
     return console.log(err)
   } 
   app.listen(port, function(){
    console.log('Listening on port ' + port);
   });
 });

app.use(express.static(path.join(__dirname, "/")));

app.get('/', function (req, res) {
  console.log(path.join(__dirname,'/src/index.html'))
  res.sendFile(path.join(__dirname,'/src/index.html'))
});

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
})

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
var Schema = mongoose.Schema;

var AdministrationSchema = new Schema({

  username: { type: String,required:true},
  password: { 
    type: String,
    required:true,
    validate:{
      validator:function(v){
        return v.length > 6
      },
      message:"You must provide more than 8 charaters"
    }
  }
},{versionKey:false});


var BookSchema = new Schema({
    title: { type: String, required:true},
    authors: [String],
    pageCount: {type: Number},
    description: {type: String},
    publisher: {type: String},
    publishedDate: {type: String},
    imageLink:{type: String},
    isEbook:{type: Boolean},
    publicDomain: {type: Boolean},
    isAvalibleEpub: {type: Boolean},
    downloadLink:{type: String},
    categories: [String]
},{versionKey:false})

var UserSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator:function(v){
        return v.length > 3
      },
      message:"Length of username must be more than 3 charaters"
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },  
  books:[{type:Schema.Types.ObjectId,ref:'Book'}],
  password: {
    type:String,
  }
})

BookSchema.plugin(autoIncrement.plugin,{
  model:'Book',
  field:'bookId',
  startAt:0,
  incrementBy:1
})




var Admin = mongoose.model('admins',AdministrationSchema,'admins');
var Book = mongoose.model('books',BookSchema,'books');
var User = mongoose.model('users',UserSchema,'users');

const booker = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: "Dumnezeul mare",
    authors: ["adev"],
    pageCount: 222,
    description: "ceva psiropdjafjawfafwaf",
    publisher: "Un tip",
    publishedDate: "candva",
    imageLink:"evalin.com",
    isEbook:true,
    publicDomain: true,
    isAvalibleEpub: true,
    downloadLink:"alt lin.com",
    categories: ["art","basin"]
})

const user = new User({
  _id : new mongoose.Types.ObjectId(),
  email:"ionut@gmail.com",
  books:[{type: Schema.Types.ObjectId, ref: 'Book'}],
  password:"cevaceva"
})

app.post('/api/addUser',async (req,res)=>{
 // res.status(200).json(user)
 // user = await BookSchema.find({title:"Dumnezeul mare"}).populate('books')

  if(user){
    res.status(200).json(user)
  }
  

  // user.save((err,data)=>{
  //   if(err){
  //     res.status(500).json(err)
  //   }else{
  //     res.status(200).json({data:'user Has been inserted'})
  //   }
  // })
})

app.post('/api/addBook',(req,res)=>{
  var book = new Book(req.body);
  book.save((err,data)=>{
    if(err){
      res.status(500).json(err)
    }else{
      res.status(200).json({data:'book Has been inserted'})
    }
  })
})

app.post('/api/addAdmin',(req,res)=>{
  var mod = new Admin(req.body);
  if(mod){
    mod.save((err,data)=>{
      if(err){
        res.status(404).json(err)
      }else{
        res.status(200).json({data:'data Has been inserted'})
      }
    })
  }
})

app.get('/api/getAdmin',(req,res)=>{
  Admin.find({},(err,data)=>{
    if(err){
      res.status(404).json(err)
    }else{
      res.status(200).json(data)
    }
  })
})


app.get("/cucurigu", (req,res) => {
  res.status(200).json("BAUBAUBAUABBA")
});

