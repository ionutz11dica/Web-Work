const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
require('dotenv').config({path: 'access_keys.env'})

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
            console.log(process.env.secret_jwt)
            let tokenUser = jwt.sign({ username: result.username, password: result.password}, process.env.secret_jwt,{expiresIn: '24h'});
            res.status(200).json({
                username: result.username,
                token: tokenUser
            })
        } else {            
            res.status(404).json({message:'Username or password is incorrect'})
        }
    });

});

module.exports = router;
