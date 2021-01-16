const mongoose = require("mongoose");

const package = new mongoose.Schema({
    packagename: { type:String, required:true},
    packagephoto: {type:String, required:true},
    packageprice: {type:Number, required:true},
    subcategoryid: { type:String, required: true },
});
    
module.exports = mongoose.model("package",package);
