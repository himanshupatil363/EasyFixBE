const mongoose = require("mongoose");

const offer = new mongoose.Schema({
    subcategoryid: { type:String, required: true },
    per: {type:Number , required:true},
});
    
module.exports = mongoose.model("offer",offer);
