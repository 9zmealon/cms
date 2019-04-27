var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cms', {useNewUrlParser: true})
.then(()=>console.log('Connected'))
.catch((err)=>console.log('err connection',err))
module.exports = mongoose;