const express = require('express');
const send = require('send');
const jwt = require('jsonwebtoken');
const router = express.Router();
const uuid = require('uuid');

let users = require('../../fake-data/acc.json');

//1- post login return json token
router.post("/login",(req,res)=>{
   
    const cred = {
        username: req.body.Username,
        password: req.body.Password
    };
    if (!cred.username || !cred.password) {
        res.sendStatus(400);
    }
    if(cred){
        // res.status(200).send('login api works!')
        jwt.sign({user:cred},"mysecretkey",(err,token)=>{
            res.json({token});
        });
    };
});


module.exports = router;