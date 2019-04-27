// var mongoose = require('../dbConnection/mongo');
var express = require('express');
var router = express.Router();
var Page = require('../model/Page');
var authentication = require('../middleware/authentication')

router.get('/',authentication.isLog,  (req, res)=>{
    Page.find({},(err, page)=>{
        if(err) throw err;
        res.send({page});
    })
})

router.post('/', authentication.isLog, (req, res)=>{
    Page.create(req.body,(err, page)=>{
        if(err) throw err;
        res.send({page});
    });
});

router.delete('/:id', authentication.isLog, (req,res)=>{
    Page.findByIdAndDelete(req.params.id,(err,page)=>{
        if(err) throw err;
        res.send({page});
    });
});
module.exports = router;