const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    price:{
        type: Number,
        required: [true, "Please enter the price"],
    },
    img:{
        type: String,
    },
    category: {
        type: String,
        required: [true, "Please provide a name"]
      },
    provider: [{
        type: ObjectId,
        ref: 'Provider',
        required: [true, "Provider is not defined"]
    }]
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;