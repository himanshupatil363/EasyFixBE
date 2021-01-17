const mongoose = require("mongoose");

const servicefeedback = new mongoose.Schema({
    userid : {type:String , required:true},
    subject : {type:String, required:true},
    message: {type:String, required:true},
    subcategoryid : {type:String, required:true},
    datetime : {type:Date, required:true},
});
    
module.exports = mongoose.model("servicefeedback",servicefeedback);
