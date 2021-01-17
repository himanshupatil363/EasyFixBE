const mongoose = require("mongoose");

const reciept = new mongoose.Schema({
    orderid : {type:String , required:true},
});
    
module.exports = mongoose.model("reciept",reciept);
