var express = require('express');
var router = express.Router();
var Post = require('../model/Post');
var authentication = require('../middleware/authentication')

router.get('/', authentication.isLog, (req, res) => {//-------All posts.
    Post.find({}, (err, post) => {
        if (err) throw err;
        res.send({ post });
    })
})


router.get('/op/:pageId', authentication.isLog, (req, res) => {//-------posts ot this page & posts options.
    // Post.find({ pageId: req.params.pageId }, {}, (err, post) => {//-------For pageId. We can use either of the two method to find the posts, pages, images, etc.
    Post.find({ page: req.params.pageId }, {}, (err, post) => {//-------For page----i.e.page id list ===> page = [{type: ObjectId, ref: 'pages'}] in the post model.
        if (err) throw err;
        res.send({
            post,
            addPost: '/post/' + req.params.pageId,
        });
    })
})


router.post('/:pageId', authentication.isLog, (req, res) => {//------create post
    var data = {
        ...req.body,
        userId: req.user._id,
        pageId: req.params.pageId,
        page: req.params.pageId
    }
    Post.create(data, (err, post) => {
        if (err) throw err;
        // res.redirect(301, `/image/${post._id}`);
        res.send({ message: "select image to this post", link: `/image/${post._id}` })
    })
})


router.delete('/:postId', authentication.isLog, (req, res) => {//-------post delete
    Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
        if (err) throw err;
        console.log(post)
        res.send({
            message: "delete successful",
            deletedPost
        }
        );
    })
})


//-----------------------------------------------------------------------------------------
router.put('/page/:id', authentication.isLog, (req, res) => {//-------page id put

    Post.findByIdAndUpdate(req.params.id, {
        $push: {
            'page': req.body.page
        }
    }, (err, post) => {
        if (err) throw err;
        res.send({ post });
    })
})

router.delete('/page/:id', authentication.isLog, (req, res) => {//-------page id delete

    Post.findByIdAndUpdate(req.params.id, {
        $pull: {
            'page': req.body.page
        }
    }, (err, post) => {
        if (err) throw err;
        res.send({ post });
    })
})//-----------------------------------------------------------------------------------------


module.exports = router;