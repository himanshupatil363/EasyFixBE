const crypto = require('crypto');
const Admin = require('../models/Admin');
const ErrorResponse = require('../utlis/errorResponse');
exports.add = async (req, res, next) => {
    const {
        adminname,
        email,
        password
    } = req.body;
    try {
        const admin = await Admin.create({
            adminname,
            email,
            password
        });
        sendToken(admin, 201, res);
    } catch (error) {
       next(error);
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorResponse("Please provide email and password", 404))
    }
    try{
        const admin = await Admin.findOne({ email }).select("+password");
        if(!admin){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        const isMatch = await admin.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        sendToken(admin, 200, res);
    }
    catch(error){
        res.status(500).json({success:false, error:"Invalid Credentials"})
    }
};


const  sendToken = (admin ,statusCode, res) => {
    const token = admin.getSignedToken();
    res.status(statusCode).json({success:true, token})
}