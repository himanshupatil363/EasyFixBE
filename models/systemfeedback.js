const mongoose = require("mongoose");

const systemfeedback = new mongoose.Schema({
    username : {type:String , required:true},
    emailid: {type:String , required:true},
    message: {type:String, required:true},
});
    
module.exports = mongoose.model("systemfeedback",systemfeedback);
