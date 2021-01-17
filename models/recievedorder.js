const mongoose = require("mongoose");

const recievedorder = new mongoose.Schema({
    userid : {type:String , required:true},
    address : {type:String , required:true},
    city : {type:String, required:true},
    datetime : {type:Date, required:true},
    subcategoryid: {type:String, required:true},
    status: {type:Date, default:"incompleted"},
});
    
module.exports = mongoose.model("recievedorder",recievedorder);
