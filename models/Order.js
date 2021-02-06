const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a user name"]
    },
    providername: {
        type: String,
        required: [true, "Please provide a provider name"]
    },
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
        default:"pending",
        required: [true, "Please provide a status"]
    },
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;