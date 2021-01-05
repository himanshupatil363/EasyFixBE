const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    name: { type:String, required: true },
    emailid: { type:String , required:true },
    pwd: { type:String, required:true },
    photo: { type:String, required:true}
});
    
module.exports = post = mongoose.model("admindata",admin);