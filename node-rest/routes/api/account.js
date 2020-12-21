const express = require('express');
const send = require('send');
const jwt = require('jsonwebtoken');
const router = express.Router();
const uuid = require('uuid');
const cors = require('cors');

let users = require('../../fake-data/acc.json');

//cors config
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//1- post login return json token
router.post("/login",cors(corsOptions),(req,res)=>{
   
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