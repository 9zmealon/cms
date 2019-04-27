var mongoose = require('../dbConnection/mongo');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var pageSchema = new Schema({
    title: String,
    post: [{ type: ObjectId, ref: 'posts' }]
});
module.exports = mongoose.model('pages', pageSchema);