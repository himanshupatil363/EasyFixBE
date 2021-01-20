const jwt = require("jsonwebtoken");

const auth =async (req,res,next) => {
    try
    {
        const token=req.header("x-auth-token");

        if(!token)
            return res.status(401).json({ msg: "No authentication token,authorization denied. " }); 

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified)
            return res.status(401).json({ msg: "Token verification failed,authorization denied. " });
        console.log(verified);

        req.userd = verified.id;
        console.log(req.userd);
        next();
    }
    catch(err)
    {
        console.error(err);
    }
};

module.exports = auth;