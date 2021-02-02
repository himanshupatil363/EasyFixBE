const crypto = require('crypto')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ProviderSchema = new mongoose.Schema({
    providername: {
        type: String,
        required: [true, "Please provide a providername"]
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please add a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
ProviderSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});
ProviderSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}

ProviderSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,});
};

ProviderSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
};

const Provider = mongoose.model("Provider", ProviderSchema);
module.exports = Provider;