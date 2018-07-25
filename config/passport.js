const JwtStartegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/student');
const express = require('express');
const database = require('../app');

const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    opts.secretOrKey = database.secret;
module.express = function(passport){
    
    passport.use(new JwtStartegy(opts, (jwt_playload, done) => {
        Student.getUserByID(jwt_playload._id, (err, student) => {
            if(err){
                return done(err, false);
            }
            if(student){
                return done(null, student);
            }
            else{
                return done(null, false);
            }
        });
    }));
}
