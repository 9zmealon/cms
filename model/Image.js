var mongoose = require('../dbConnection/mongo');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var imageSchema = new Schema({
    image: String,
    caption: String,
    userId: { type: ObjectId, ref: 'users' },
    postId: { type: ObjectId, ref: 'posts' }
});

var Image = mongoose.model('images', imageSchema);
module.exports = Image;

