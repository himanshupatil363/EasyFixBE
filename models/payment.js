const mongoose = require("mongoose");

const payment = new mongoose.Schema({
    orderid :{type:String , required:true},
    userid : {type:String, required:true},
    paymentamt : {type:Number , required:true},
    subcategoryid: { type:String, required: true },
});
    
module.exports = mongoose.model("payment",payment);
