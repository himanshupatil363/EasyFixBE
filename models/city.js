const mongoose = require("mongoose");

const city = new mongoose.Schema({
        cityname: { type:String, required: true },
});

module.exports = mongoose.model("city",city);