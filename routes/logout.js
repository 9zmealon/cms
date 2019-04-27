var express = require('express');
var router = express.Router();
var auth = require('../middleware/authentication');//-------Middleware

router.get('/', auth.isLog, (req, res)=>{
    req.logOut();
    res.send('Successful Logout.');
});


module.exports= router;