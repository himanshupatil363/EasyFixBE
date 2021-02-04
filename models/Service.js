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
        name: {
            type: String,
            required: [true, "Please provide a name"]
        },
      },
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;