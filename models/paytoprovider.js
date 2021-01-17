const mongoose = require("mongoose");

const paytoprovider = new mongoose.Schema({
    amount : {type:Number , required:true},
    providerid :{type:String , required:true},
    pdate: {type:Date, required:true},
    orderid : {type:String, required:true},
});
    
module.exports = mongoose.model("paytoprovider",paytoprovider);
