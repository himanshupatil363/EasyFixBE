const mongoose = require("mongoose");

const subcategory = new mongoose.Schema({
    categoryid: { type:String, required:true},
    subcategoryname: { type:String, required: true },
    subcategoryphoto: { type:String, required:true},
});
    
module.exports = mongoose.model("subcategory",subcategory);
