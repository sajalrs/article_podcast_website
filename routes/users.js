const express = require('express')
const router = express.Router()
const Users = require("../models/Users")

router.post('/', (req, res) => {
    const user = new Users(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    );

    user.save((err,data) => {
        if(err){
            res.send(err);
        } else {
            res.json(data);
        }
    });
})

module.exports = router