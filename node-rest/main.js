const { urlencoded } = require('body-parser');
const express = require('express');
const cors =  require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.use('/api/account', require('../node-rest/routes/api/account'));
app.use('/api/users', require('../node-rest/routes/api/users'));


app.listen(9999, ()=>{
    console.log("Server listening at http://localhost:9999");
});