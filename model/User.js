var mongoose = require('../dbConnection/mongo');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    email: String,
    password: String
});
userSchema.pre('save',function(next){
    var user = this;

    bcrypt.genSalt(10,function(err,salt){
        if(err) throw err;
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) throw err;
            console.log("HASH", hash);
            user.password=hash;
            next();
        });
    })
})

var User = mongoose.model('users', userSchema);
module.exports = User;