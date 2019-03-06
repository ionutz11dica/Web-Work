const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');
const User = require('../models/user');

router.get('/',(req,res,next) =>{
    Book.find().then(result=>{
        res.status(200).json({
            length: result.length,
            books: result
        })
    }).catch(err=>{
        res.status(404).json({message:"Books not found"})
    })
});

router.post('/',(req,res)=>{
    const book = new Book(req.body);
    book.save()
        .then(result => {
            res.status(200).json({message:'Book created successfully'})
        })
        .catch(err=> {
            res.status(500).json({message:'Book couldn`t created'})
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
    })
})


module.exports = router;