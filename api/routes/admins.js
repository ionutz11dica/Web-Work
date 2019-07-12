const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Admin = require('../models/admins');

router.get('/',(req,res)=>{
    Admin.find()
        .then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            res.status(404).json(err);
        })
})

router.post("/authenticate", (req,res,next) => {
     
    const { username, password } = req.body;
    Admin.findOne({username: username, password: password})
    .then(result => {
        if(result) {
            res.status(200).json({
                username: result.username,
                token: 'fake-jwt-token'
            })
        } else {            
            res.status(404).json({message:'Username or password is incorrect'})
        }
    });

});

module.exports = router;
