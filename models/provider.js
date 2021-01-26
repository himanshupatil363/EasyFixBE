const mongoose = require("mongoose");
const provider = new mongoose.Schema({
        name: { type:String, required: true },
        emailId: { type:String , required:true },
        pwd: { type:String, required:true },
        photo: { type:String, required:false},
        city: { type:String, required:false},
        status : { type:String , default: 'inactive'},
        joinedAt : { type:Date, default: Date.now, required:false}
});
module.exports = mongoose.model("provider",provider);