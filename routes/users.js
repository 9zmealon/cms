//-------Users Register and others
var express = require('express');
var router = express.Router();
var User = require('../model/User');
var authentication = require('../middleware/authentication');


router.get('/', authentication.isLog, authentication.adminVerify, function(req, res, next) {
  User.find({},(err,users)=>{
    if(err) throw err;
    res.send({users});
  })
});


router.post('/register', (req,res,next)=>{
  User.create(req.body,(err,user)=>{
    if(err) throw err;
    res.send({user});
  })
})

module.exports = router;
