const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const OrderSchema = new mongoose.Schema({
    user: [{
        type: ObjectId,
        ref: 'user',
        required: [true, "Provider is not defined"]
    }],
    custname: {
        type: String,
        required: [true, "Please provide a user name"]
    },
    provider: [{
        type: ObjectId,
        ref: 'Provider',
        required: [true, "Provider is not defined"]
    }],
    service: {
        type: String,
        required: [true, "Please provide a service name"]
    },
    address: {
        type: String,
        required: [true, "Please provide a address"]
    },
    datetime: {
        type: Date,
        required: [true, "Please provide a date and time"]
    },
    status: {
        type: String,
        default:"pending"
    },
    orderdAt:{
        type: Date,
        default:Date.now
    }
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;