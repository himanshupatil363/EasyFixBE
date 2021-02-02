const crypto = require('crypto');
const Provider = require('../models/Provider');
const ErrorResponse = require('../utlis/errorResponse');
const sendEmail = require('../utlis/sendEmail');
exports.register = async (req, res, next) => {
    const {
        providername,
        email,
        password
    } = req.body;
    try {
        const provider = await Provider.create({
            providername,
            email,
            password
        });
        sendToken(provider, 201, res);
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
        const provider = await Provider.findOne({ email }).select("+password");
        if(!provider){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        const isMatch = await provider.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credintials", 401))
        }
        sendToken(provider, 200, res);
    }
    catch(error){
        res.status(500).json({success:false, error:"Invalid Credentials"})
    }
};

exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;
    try{
        const provider = await Provider.findOne({email});
        if(!provider){
            return next(new ErrorResponse("Email could not be sent",404))
        }
        const resetToken = provider.getResetPasswordToken()
        await provider.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
        <h1>You Have requested a password reset</h1>
        <p>please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: provider.email,
                subject: "Password Reset Request",
                text: message
            });
            res.status(200).json({ success:true ,data:"Email Sent"})
        } catch (error) {
            provider.resetPasswordToken = undefined;
            provider.resetPasswordExpire = undefined;
            await provider.save();
            return next(new ErrorResponse("Email could not be sent",500))
        }
    }catch(error){
        next(error);
    }
};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const provider = await Provider.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now() }
        })

        if(!provider){
            return next(new ErrorResponse("Invalid Reset token",400))
        }
        provider.password = req.body.password;
        provider.resetPasswordToken = undefined;
        provider.resetPasswordExpire = undefined;
        await provider.save();
        res.status(201).json({
            success:true,
            data:"Password Reset Success"
        })
    } catch (error) {
        next(error)
    }
};

const  sendToken = (provider ,statusCode, res) => {
    const token = provider.getSignedToken();
    res.status(statusCode).json({success:true, token})
}