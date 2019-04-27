var express = require('express');
var router = express.Router();

var auth = require('../middleware/authentication');//-------Middleware


router.get('/homepage', auth.isLog, (req, res) => {
  res.send({
    user: req.user.email,
    password: req.user.password,
    page: '/page/op',
    post: `/post`,
    image: '/image',
    logout: '/logout'
  });
});

module.exports = router;
