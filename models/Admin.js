const crypto = require('crypto')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const AdminSchema = new mongoose.Schema({
    adminname: {
        type: String,
        required: [true, "Please provide a Adminname"]
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
    }
});
AdminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});
AdminSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}

AdminSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,});
};


const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;