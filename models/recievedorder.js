const mongoose = require("mongoose");

const recievedorder = new mongoose.Schema({
    userid : {type:String , required:true},
    providerid: {type:String , required:true},
    subcategoryid: {type:String, required:true},
    address : {type:String , required:true},
    cityid : {type:String, required:true},
    datetime : {type:Date, required:true},
    status: {type:String, default:"incompleted"},
});
    
module.exports = mongoose.model("recievedorder",recievedorder);
