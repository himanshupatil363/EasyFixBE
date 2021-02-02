const mongoose = require("mongoose");
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;