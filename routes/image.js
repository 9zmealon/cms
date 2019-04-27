var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, 'upload')
    }
    , filename: (req, file, cb) => {
        var customName = Math.floor(Math.random() * 999) + '-' + Date.now();
        var ext = file.originalname.split('.')[1];
        var fullFileName = customName + '.' + ext;
        cb(null, fullFileName)
    }
});
var upload = multer({storage});


var Image = require('../model/Image');
var authenticate = require('../middleware/authentication');//-----authenticate


router.get('/', authenticate.isLog, (req,res)=>{//-----All images
    Image.find({},(err,images)=>{
        if(err) throw err;
        res.send(images);
    })
})


router.post('/:postId', authenticate.isLog, upload.single('image'),(req,res)=>{//-------image add to this post
    var insertO = {
        image: req.file.filename,
        caption: req.body.caption,
        userId: req.user._id,
        postId: req.params.postId
    }
    Image.create(insertO,(err,image)=>{
        if(err) throw err;
        res.send({image});
    })
})

module.exports = router;