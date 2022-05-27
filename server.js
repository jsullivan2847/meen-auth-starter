const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    }));
app.use(express.urlencoded({extended: true}));
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions')
app.use('/users', userController);
app.use('/sessions', sessionsController);




mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log('mongo error', error));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.get('/', (req,res) => {
    res.render('index.ejs', {
        currentUser: req.session.currentUser,
    })
})

app.get('/', (req,res) => {
    if(req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser,
        });
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
        });
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('express is listening at port ', PORT);
});