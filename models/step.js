const mongoose = require("mongoose");

const step = new mongoose.Schema({
    stepdetail: {type:String , required:true},
    subcategoryid: { type:String, required: true },

});
    
module.exports = mongoose.model("step",step);
