const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs')

const User = require('../models/user');
const Book = require('../models/book');







router.get('/',(req,res,next) =>{
   
    User.find()
     .select('email books username password _id')
     .exec()
     .then(docs=>{
         if(docs){
             const response = {
                 count: docs.length,
                 users:docs.map(doc=> {
                     return{
                        email: doc.username,
                        password: doc.password,
                        books:doc.books,
                        _id : doc._id,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:4000/users/'+doc._id
                        }
                     }
                 })
             }
             res.status(200).json(response)
         } else {
             res.status(404).json({message:"No valid entry found for provided ID"})
         }
     })
     .catch(err =>{
         console.log(err);
         res.status(500).json({error:err});
         })
     });



router.get('/books',(req,res,next) =>{
    User.findById(req.body._id)
        .select()
        .then(user=>{
            Book.find()
                .where({'_id':{$in:user.books}})
                .then(data=>{
                    res.status(200).json({books:data})
                })
                .catch(err =>{
                    res.status(500).json({error:err});
                });
        })
        .catch(err =>{
            res.status(500).json({error:err});
        });
})
  

router.get('/:email',(req,res,next) =>{
   User.findOne({email:req.params.email})
    .then(user=>{
        if(user.books.length > 0){
                Book.aggregate([
                    {'$match':{'_id':{'$in':user.books}}},
                ])
                .then(result=>{
                        console.log(user.books.length)
                        res.status(200).json(result);
                    })
        } else {
            res.status(404).json({message:"No books found for this user"})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
        })
});


router.get('/wantToReadBooks/:email',(req,res,next) =>{
    User.findOne({email:req.params.email})
     .then(user=>{
         if(user.wantToRead.length > 0){
                 Book.aggregate([
                     {'$match':{'_id':{'$in':user.wantToRead}}}
                 ])
                 .then(result=>{
                         console.log(user.wantToRead.length)
                    
                         res.status(200).json(result);
                     })
         } else {
             res.status(404).json({message:"No books found for this user"})
         }
     })
     .catch(err =>{
         console.log(err);
         res.status(500).json({error:err});
         })
 });


router.post('/add',(req,res,next) =>{
    User.findOne({email:req.body.email})
        .then(resulter=>{
            if(resulter){
                res.status(400).json('This user already exists');
            }else{
                const user = new User(req.body);
                user.save()
                    .then(result =>{
                    res.status(201).send(result)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:err});
        });
})

router.post('/login',(req,res,next) =>{
    User.findOne({$or: [
                    {username:req.body.username, password:req.body.password},
                    {email:req.body.email}
                ]})
        .then(resulter=>{
            if(resulter){
                console.log(resulter)
                if(resulter.email === req.body.email || (resulter.username === req.body.username && resulter !== null && 
                    resulter.password === req.body.password && req.body.password !== null)){
                        res.status(200).json({message:"logged in"});
                }else{
                
                    if(req.body.email){
                        const user = new User(req.body)
                        user.save()
                            .then(userResult=>{
                                res.status(201).json(userResult)
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({error:err});
                            });
                    }else{
                        res.status(400).json("That user doesn't exists");
                    }
                }
            }else{
                if(req.body.email){
                    const user = new User(req.body)
                    user.save()
                        .then(userResult=>{
                            res.status(201).json(userResult)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({error:err});
                        });
                }else{
                    res.status(404).json("That user doesn't exists");
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:err});
        });
})


router.patch('/:bookId/:email',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            if(book){
                User.findOneAndUpdate({email:req.params.email},{$addToSet:{books:book._id}})
                .then(result=>{
                    console.log(result)
                    if(result){
                        res.status(200).json(result);
                    }else{
                        res.status(401).json({message:"Book couldn't be added"})   
                    }
                    
                }).catch(err=>{
                    res.status(400).json({message:"Book couldn't be added"})                
                })
            }else{
                res.status(404).json({message:"Error book"}) 
            }
            
        }).catch(err=>{
            res.status(404).json({message:"Error, book not found"})                
        })
})

router.patch('/wantToRead/:bookId/:email',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            if(book){
                User.findOneAndUpdate({email:req.params.email},{$addToSet:{wantToRead:book._id}})
                .then(result=>{
                    console.log(result)
                    if(result){
                        res.status(200).json(result);
                    }else{
                        res.status(401).json({message:"Book couldn't be added"})   
                    }
                    
                }).catch(err=>{
                    res.status(400).json({message:"Book couldn't be added"})                
                })
            }else{
                res.status(404).json({message:"Error book"}) 
            }
            
        }).catch(err=>{
            res.status(404).json({message:"Error, book not found"})                
        })
})

router.patch('/:bookId/:username/:password',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            if(book){
                User.findOneAndUpdate({username:req.params.username,password:req.params.password},{$addToSet:{books:book._id}})
                .then(result=>{
                    console.log(result)
                    if(result != null){
                        res.status(202).json({message:"User has a book !!"})
                    }else{
                        res.status(400).json({message:"Book couldn't be added"})   
                    }
                    
                }).catch(err=>{
                    res.status(400).json({message:"Book couldn't be added"})                
                })
            }else{
                res.status(404).json({message:"Error book"}) 
            }
            
        }).catch(err=>{
            res.status(404).json({message:"Error, book not found"})                
        })
})

router.put('/delete/:email',(req,res,next) =>{
        console.log(req.body.books)

            User.updateOne({email:req.params.email},{$pull:{books:{$in :req.body.books}}},{multi:true})
            .then(result=>{
                // console.log(result)
                if(result){
                    res.status(202).json({message:"User has been deleted a scanned book"})
                }else{   
                    res.status(400).json({message:"Error, user not found"})  
                }
            })
            .catch(err=>{
                res.status(402).json({message:"Error, user not found"})                
            })
})

router.patch('/wantToRead/delete/:email/:bookId',(req,res,next)=>{
    // console.log(req.params.email)
        User.findOneAndUpdate({email:req.params.email},{$pull:{wantToRead:req.params.bookId}},{safe: true, upsert:true})
        .then(result=>{
            
            if(result){
                res.status(202).json({message:"User has been deleted a book"})
            }else{
                res.status(400).json({message:"Error, user not found"})  
            }
        })
        .catch(err=>{
            res.status(402).json({message:"Error, user not found"})                
        })
})

router.put('/:username/:password/:bookId',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            User.findOneAndUpdate({username:req.params.username,password:req.params.password},{$pull:{books:book._id}})
            .then(result=>{
                console.log(result)
                if(result){
                    res.status(202).json({message:"User has been deleted a book"})
                }else{
                    res.status(400).json({message:"Error, user not found"})  
                }
            })
            .catch(err=>{
                res.status(402).json({message:"Error, user not found"})                
            })
        }).catch(err=>{
            res.status(401).json({message:"Error, book not found"})                
        })
})









module.exports = router;