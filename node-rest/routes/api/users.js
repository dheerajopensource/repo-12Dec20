const express = require('express');
const send = require('send');
const router = express.Router();
const uuid = require('uuid');

let users = require('../../fake-data/users.json');

//api starts!

//1. get all user
router.get("/", (req, res) => {
    res.json(users);
});

//2. get user by id
router.get("/:id", (req, res) => {
    const user_exists = users.some(u => u.id === parseInt(req.params.id));
    if (user_exists) {
        res.json(users.filter(u => u.id === parseInt(req.params.id)));
    }
    else {
        res.sendStatus(400);
    }
});

//3. post
router.post("/", (req, res) => {
    const newUser = {
        id: uuid.v4(),
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar
    };
    if (!newUser.first_name || !newUser.email) {
        res.sendStatus(400);
    }

    users.push(newUser);
    res.json(users);
});

//4. put
router.put("/:id", (req, res) => {
    const user_exists = users.some(u => u.id === parseInt(req.params.id));

    if (user_exists) {
        const editUser = req.body;

        users.forEach(u => {
            if (u.id === parseInt(req.params.id)) {
                u.first_name = editUser.first_name ? editUser.first_name : u.first_name;
                u.last_name = editUser.last_name ? editUser.last_name : u.last_name;
                u.email = editUser.email ? editUser.email : u.email;
                res.json({message:'user updated', user: u});
            }
        })       
    }
});

//5. delete
router.delete("/:id",(req,res)=>{
    const user_exists = users.some(u=> u.id === parseInt(req.params.id));
    
    if(user_exists){
        const deletedUser = users.filter(u=> u.id === parseInt(req.params.id));
        users = users.filter((u)=> u.id !== parseInt(req.params.id));
        
        res.json({message: 'user '+ deletedUser[0].first_name +' removed!', remaining_users: users});
    }
    else{
        res.sendStatus(400);
    }
});


//api ends!

module.exports = router;