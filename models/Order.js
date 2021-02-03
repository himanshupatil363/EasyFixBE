const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please specify user"],
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, "Please specify provider"],
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, "Please specify service"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;