const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    img: {
        type: String,
    },
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;