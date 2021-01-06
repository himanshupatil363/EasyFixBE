const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type:String, required: true },
    emailid: { type:String , required:true },
    pwd: { type:String, required:true },
    photo: { type:String, required:false},
    city: { type:String, required:false}
});

module.exports = mongoose.model("user",userSchema);