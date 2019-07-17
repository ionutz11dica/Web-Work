const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');

const Book = require('../models/book');
const User = require('../models/user');

mongoose.connect('mongodb://books:'+ process.env.MONGOLAB_PW +'@ds049219.mlab.com:49219/licenta2019', { useNewUrlParser:true } )
const conn = mongoose.connection;

Grid.mongo = mongoose.mongo;
var gfs ;

var txtPath = path.join(__dirname,'../../uploads/lic.docx')

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db);
    gfs.collection('contents');
  });


const storage = new GridFsStorage({
    url: 'mongodb://books:'+ process.env.MONGOLAB_PW +'@ds049219.mlab.com:49219/licenta2019',
    destination:'./../../uploads',
    md5:{unique:true},
    file:(req,file) =>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err);
                }
                const fileInfo = {
                filename:file.originalname,
                bucketName: 'contents'
            }
            resolve(fileInfo);
            })
            
        });
    }
});




storage.on('error', (err, config) => {
    // Make sure the error matches 
    if (err.name === 'MongoError' && err.code === 11000) {
        gfs.collection('contents.chunks')
            .delete({file_id: config._id});
    }
});



const upload = multer({ storage });


router.post('/upload',(req,res)=> {
    const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db);

    var writeStream = gridFSBucket.openUploadStream('tescaddt.docx')
    fs.createReadStream(txtPath).pipe(writeStream)
    res.status(200).json({message:"transfered"})
    writeStream.on('close',function(file){
        console.log(file)
    })
})
  


router.get('/randomBooks',(req,res)=>{
 
    Book.findRandom({}, {}, {limit: 10}, function(err, results) {
        if (!err) {
            res.status(200).send(results);
        }
    });
})


router.get('/someImageBooks',(req,res)=>{
    // var fields = {title:1 ,imageLink: 1, _id: 0 };
    Book.find()
        .sort({noDownloads:-1})
        .limit(5)
        .then(result=>{
            res.status(200).json(result)
        })
})

router.get('/:elementSearched',(req,res) => {
    Book.find({$or:[
        {
            'title':{"$regex":req.params.elementSearched, "$options": "i"}
        },
        {
            'authors':{"$regex":req.params.elementSearched, "$options": "i"}
        }
    ]}).
    then(result=>{
        res.status(200).json(result)
    })
})

router.get('/categorySearch/:category',(req,res) => {
    Book.find(
        {
            'categories':{"$regex":req.params.category, "$options": "i"}
        }
    ).
    then(result=>{
        res.status(200).json(result)
    })
})


router.get("/", (req,res,next) => {
    Book.find().then(result =>{
        res.status(200).json(result)
    }).catch(err => {
        res.status(404).json(error )
    })
})



router.get('/files', (req, res) => {
    console.log("intra?")
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.status(200).json(files);
    }) .catch(err => {
            console.log(err)
            res.status(500).json({error:err});
        });;
  });

router.post('/uploadFile', upload.single('epubFile'), function (req, res, next) {
    console.log(req)
    res.send(req.file);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})


router.post('/addFile', upload.single('epubFile'), (req,res)=> {
    console.log(req)
    //se primeste doar req.file .body este gol
    Book.findOne({title:req.body.title})
        .then(result=>{
            if(result){
                gfs.remove({filename: req.body.title, root:'contents'},(err,gridStore)=>{
                    if(err){
                        res.status(404).json({message:"Nu e nimic de sters"})
                    }else{
                        
                    }
                })
                res.status(404).json({message:'Book already exists'})
            } else {
                    const book = new Book(req.body);
                    book["fileID"] = req.file.id;
                    console.log("spanac"+book["fileID"])
                    book.save()
                        .then(result => {
                            // res.header('Content-Length', req.file.size);
                            // res.header('transfer-encoding', false);
                            res.status(200).json({message:'Book created successfully'})
                        })
                        .catch(err=> {
                            res.status(400).json({message:'Book couldn`t be created'})
                        })
            }
        })
        .catch(err=> {
            res.status(404).json({message:'Book couldn`t be created'})
        })

})


router.put('/nodownloads/:id',(req,res)=>{
        Book.update({_id:req.params.id}, {$inc: {noDownloads:1}}, { $new: true})
    .lean().exec(function (err, data) {
        res.status(200).json({message:"icrease successfully"})
 
 });
})


router.get('/download/:id',(req,res)=>{
//     Book.update({_id:req.params.id}, {$inc: {noDownloads:1}}, { $new: true})
//     .lean().exec(function (err, data) {
//         console.log("mergi?")
 
//  });
    
    gfs.files.find({_id:req.params.id},(err,file)=>{
        
            if(err){
                res.status(400).json({message:'Download Error'});
            }
            else if(!file){
                res.status(400).json({message:'File doesn`t exists'});
            }

                
            res.contentType('application/epub+zip')
            
            
            var readstream = gfs.createReadStream({
                _id: req.params.id,
                root: 'contents'
              });
            var dataLength = 0;
            readstream.on('data', function (chunk) {
                    dataLength += chunk.length;
                }).on('end', function () {  // done
                    console.log('The length was:', dataLength);
                  });
            readstream.on('error',function(err){
                res.end();
            })

            
           return readstream.pipe(res);
            // res.status(200).json({message:'A gasit fisier?'}) 
        })
})

router.get('/fetch/:isbn', (req,res)=>{
    console.log(req.params.isbn)
    Book.findOne({isbn:req.params.isbn},(err,book)=>{
        if(err){
            res.status(404).json({message:"Book doesn't exists"})
        }else{
            if(book != null){
                console.log(book)
                res.status(202).send(book);
            }else{
                res.status(404).json({message:"Book doesn't exists"})
            }
            
        }
    })
})

router.delete('/:bookId',(req,res)=>{
    Book.findOneAndDelete({'_id':req.params.bookId},(err,book)=>{
        if(err){
            res.status(404).json({message:"Book hasn't been removed"})
        }else{
            User.find({'books':{$in:[req.params.bookId]}
            })
            .updateMany({$pull:{books:book._id}})
            .then(result=>{
                res.status(202).json({message:"User's book has been deleted"})
            })
            .catch(err=>{
                res.status(404).json({message:"Error, user not found"})                
            })
        }
    });
})


module.exports = router;