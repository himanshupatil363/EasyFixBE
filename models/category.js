const mongoose = require("mongoose");

const category = new mongoose.Schema({
    categoryname: { type:String, required: true },
    categoryphoto: { type:String, required:true},
});
    
module.exports = mongoose.model("category",category);