var express = require('express');
var router = express.Router();
var Post = require('../model/Post');
var authentication = require('../middleware/authentication')

router.get('/', authentication.isLog, (req,res)=>{
    Post.find({},(err,post)=>{
        if(err) throw err;
        res.send({post});
    })
})

router.post('/', authentication.isLog, (req,res)=>{
    var data = {
        ...req.body,
        userId: req.user._id
    }
    Post.create(data,(err,post)=>{
        if(err) throw err;
        res.send({post});
    })
})

router.put('/page/:id', authentication.isLog, (req,res)=>{
  
    Post.findByIdAndUpdate(req.params.id,{$push: {
        'page': req.body.page
    }},(err,post)=>{
        if(err) throw err;
        res.send({post});
    })
})

router.delete('/page/:id', authentication.isLog, (req,res)=>{
  
    Post.findByIdAndUpdate(req.params.id,{$pull: {
        'page': req.body.page
    }},(err,post)=>{
        if(err) throw err;
        res.send({post});
    })
})

module.exports = router;