const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs')

const Book = require('../models/book');
const User = require('../models/user');

mongoose.connect('mongodb://books:'+ process.env.MONGOLAB_PW +'@ds049219.mlab.com:49219/licenta2019',{useNewUrlParser:true})
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
    file:(req,file) =>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                filename:filename,
                bucketName: 'contents'
            }
            resolve(fileInfo);
            })
            
        });
    }
});
const upload = multer({
    storage
});


router.post('/upload',(req,res)=>{
    const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db);

    var writeStream = gridFSBucket.openUploadStream('tescaddt.docx')
    fs.createReadStream(txtPath).pipe(writeStream)
    res.status(200).json({message:"transfered"})
    writeStream.on('close',function(file){
        console.log(file)
    })
})
  

router.get('/',(req,res,next) =>{

    Book.find().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(404).json({message:"Books not found"})
    })
});

router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });


router.post('/add',upload.single('file') ,(req,res)=>{
    Book.findOne({title:req.body.title})
        .then(result=>{
            
            if(result){
                res.status(402).json({message:'Book already exists'})
            } else {
                
                const book = new Book({
                    title: req.body.title,
                    authors:  req.body.authors,
                    pageCount: req.body.pageCount,
                    fileID: req.file.id
                });
                console.log(req.file.id)
                
                book.save()
                    .then(result => {
                        res.status(200).json({message:'Book created successfully'})
                    })
                    .catch(err=> {
                        res.status(400).json({message:'Book couldn`t created'})
                    })
            }
        })
        .catch(err=> {
            res.status(404).json({message:'Book couldn`t created'})
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