const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: { type:String, required: true },
       emailid: { type:String , required:true },
       pwd: { type:String, required:true },
       photo: { type:String, required:true},
       city: { type:String, required:false}
});

module.exports = post = mongoose.model("userdata",user);