var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
// var Student = require('./models/student');

passport.use('local', new LocalStrategy({
    usernameField: 'reg_number',
    passwordField: 'pass'
},
  function(username, password, done) {
    Student.findOne({ reg_number: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, user) {
      done(err, user);
    });
  });