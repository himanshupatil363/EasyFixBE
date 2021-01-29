const User = require('../models/User');
const ErrorResponse = require('../utlis/errorResponse');
exports.register = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        sendToken(user, 201, res);
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
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        sendToken(user, 200, res);
    }
    catch(error){
        res.status(500).json({success:false, error:"Invalid Credentials"})
    }
};

exports.forgotpassword = (req, res, next) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent",404))
        }
        const resetToken = user.getResetPasswordToken()
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
        <h1>You Have requested a password reset</h1>
        <p>please go to this link ti reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            
        } catch (error) {
            
        }
    }catch(error){

    }
};

exports.resetpassword = (req, res, next) => {
    res.send("resetpassword route");
};

const  sendToken = (user ,statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true, token})
}