const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/review');
const User = require('../models/user');
const Book = require('../models/book');


router.post('/user',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                const review = new Review(req.body);
                Book.findByIdAndUpdate(req.body.bookId,{$addToSet : {reviews:review.email}})
                    .then(book=>{
                        Review.findOne({email:req.body.email , bookId:req.body.bookId })
                            .then(result => {
                                if(result){
                                    res.status(202).json({message:'That book has already a review'});
                                } else { 
                                    review.save()
                                    .then(result => {
                                        res.status(201).json({message:'Review created successfully'})            
                                    })
                                    .catch(err=> {
                                        res.status(500).json({message:'Review couldn`t be created'})
                                    })
                                }
                            }) 
                        })
                        .catch(err=> {
                            res.status(404).json({message:'Book not found'})
                        }); 
                } else {
                    res.status(404).json({message:'User not found'})
                }    
        })
        .catch(err=> {
            res.status(500).json({message:'Error'})
       });
});

router.get('/:email',(req,res)=>{
    Review.find({email:req.params.email})
        .then(result=>{
            if(result){
                res.status(200).json({
                    reviews: result
                })
            } else{
                res.status(404).json({message:'Reviews not found'})
            }
        })
        .catch(err=> {
            res.status(500).json({message:'Error reviews'})
       });
})

router.get('/',(req,res)=>{
    
    Review
    
    .aggregate(
        [
            {$match:{}},
            {$group:{_id:"$bookId", rating:{$avg:"$rating"}}}
        ]
    ).then(result=>{
        res.status(200).json({reviews: result})
    })
})



module.exports = router;