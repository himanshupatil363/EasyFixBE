const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type:String, required: true },
    emailid: { type:String , required:true, unique:true },
    pwd: { type:String, required:true ,minlength: 5},
    photo: { type:String, required:false},
    city: { type:String, required:false}
});

module.exports = mongoose.model("user",userSchema);