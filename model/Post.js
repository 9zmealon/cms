var mongoose = require('../dbConnection/mongo');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var postSchema = new Schema({
    title: String,
    description: String,
    media: [{ type: ObjectId, ref: 'images' }],
    userId: { type: ObjectId, ref: 'users' },
    page:[{type: ObjectId, ref: 'pages'}],
    pageId : {type: ObjectId, ref: 'pages'}
});

module.exports = mongoose.model('posts', postSchema);