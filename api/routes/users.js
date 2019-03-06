const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
                        res.status(200).json({UserBooks:result});
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



router.post('/',(req,res,next) =>{
    const user = new User(req.body);
    user.save()
        .then(result =>{
        console.log(result);
        res.status(200).json({
            message:"merge POST request to /users",
            createdUser: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err});
    });
    
})

router.put('/:bookId/:email',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            User.find()
            .where({email:req.params.email})
            .update({$push:{books:book._id}})
            .then(result=>{
                res.status(202).json({message:"User has a book now"})
            })
            .catch(err=>{
                res.status(404).json({message:"Error, user not found"})                
            })
        }).catch(err=>{
            res.status(404).json({message:"Error, book not found"})                
        })
})

router.patch('/:email/:bookId',(req,res,next) =>{
    Book.findById(req.params.bookId)
        .then(book => {
            User.find()
            .where({email:req.params.email})
            .update({$pull:{books:book._id}})
            .then(result=>{
                res.status(202).json({message:"User delete a book"})
            })
            .catch(err=>{
                res.status(404).json({message:"Error, user not found"})                
            })
        }).catch(err=>{
            res.status(404).json({message:"Error, book not found"})                
        })
})



module.exports = router;