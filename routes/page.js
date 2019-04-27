// var mongoose = require('../dbConnection/mongo');
var express = require('express');
var router = express.Router();
var Page = require('../model/Page');
var authentication = require('../middleware/authentication')




router.get('/',authentication.isLog,  (req, res)=>{//-------Incase
    Page.find({},(err, pages)=>{
        if(err) throw err;
        res.send({
            pages
        })
    })
})

router.get('/op',authentication.isLog,  (req, res)=>{//-------Page Options
    Page.find({},(err, pages)=>{
        if(err) throw err;
        // var sL;
        // for (let index = 0; index < pages.length; index++) {
        //     sL = {...pages[index]._id}
        // }
        //--------------------------------------empty case???
        res.send({
            page_1 : '/page/' + pages[0]._id,
            page_2 : '/page/' + pages[1]._id,
            totalPages : pages.length,
            addPage : '/page'
            // // sL
            // pages
        })
    })
})

router.get('/:pageId', authentication.isLog, (req,res)=>{//-------Path to Post
    Page.findById(req.params.pageId,(err,page)=>{
        if(err) throw err;
        res.send({
            Post : '/post/op/' + page._id,
            deletePage : `/page/${page._id}`,
            page
        })
    })
})


// res.redirect(301, `/income/${result._id}/user-income`);
router.post('/', authentication.isLog, (req, res)=>{//-------Create Page
    Page.create(req.body,(err, page)=>{
        if(err) throw err;
        res.send({page});
    });
});

router.delete('/:pageId', authentication.isLog, (req,res)=>{//-------Delete Page
    Page.findByIdAndDelete(req.params.pageId,(err,page)=>{
        if(err) throw err;
        res.redirect(301,`/page/op`);
    });
});
module.exports = router;