const mongoose = require("mongoose");

const provider = new mongoose.Schema({
    name: { type:String, required: true },
       emailid: { type:String , required:true },
       pwd: { type:String, required:true },
       photo: { type:String, required:true},
       city: { type:String, required:false},
       subcategoryid : { type:String , required:true},
       specialization : {type:String , required:false},
        status : { type:String , default: 'De-Active'} 
});

module.exports = providerinsert = mongoose.model("Providerdata",provider);