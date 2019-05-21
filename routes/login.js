var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');//addedThisLine

var User = require('../model/User');

var passport = require('passport')//ERROR Fixed
 , LocalStrategy = require('passport-local').Strategy;

 passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    (username, password, done) => {
      User.findOne({email: username},
        (err, result) => {
          if (err) throw err;
          if (!result) return done(null, false, { message: 'user not found' });
          
          if(bcrypt.compareSync(password, result.password)){
            return done(null, result);
          }
          else{
            return console.log("not found");
          }
          //addedThisLine

        });
    }));

router.post('/',
    passport.authenticate("local",
    {
    successRedirect: '/homepage',
    failureRedirect: '404',
    failureFlash: true
    }));
module.exports = router;

//users---old,hello---old1,hello1