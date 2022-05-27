const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');



userRouter.get('/', (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    });
});

//NEW
userRouter.get('/new', (req,res) => {
    res.render('users/new.ejs');
})


//UPDATE //REGISTRATION
userRouter.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    });
});


module.exports = userRouter;