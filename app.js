// importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressValidators = require('express-validator')
var expressSession = require('express-session');
var passport = require('passport');

var app = express();

const route = require('./routes/route');

//connect to mongodb

mongoose.connect('mongodb://localhost:27017/ExamBranch');

//passport
var passport = require('passport');
var session = require('express-session'); 

app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge: 36000000,
        httpOnly:false,
        secure:false
    }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


//on connection

mongoose.connection.on('connected',()=>{
    console.log('connected to database');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in database : '+console.err);
    }    
});

//port

const port = 3000;

//adding middleware

app.use(cors());

//passport middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');
(passport);

//body-parser

app.use(bodyparser.json());

//static files

app.use(express.static(path.join(__dirname, 'public')));

//add routes

app.use('/api', route);

app.use(expressValidators());

app.use(expressSession({secret: 'maax', saveUninitialized: false, resave: false}));

//testing server

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.listen(port,(err)=>{
    if(err){
        console.log("error");
    }
    console.log('Server start at port: '+port);
});