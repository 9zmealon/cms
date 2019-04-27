function authenticate(req,res,next)
{
    if(!req.isAuthenticated()){
        return res.send("Please Login.")
    }
    next();
}

function admin(req,res,next)
{
    if(req.user.email == "katapa"){
        next()
    } else{
        return res.send("You are not the Admin")
    }
    
}

module.exports.isLog = authenticate;
module.exports.adminVerify = admin;