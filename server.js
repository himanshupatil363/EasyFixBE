const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//setup express

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 9999;
console.log("Starting server");
app.listen(PORT, () => console.log(`server started on ${PORT}`));

//setup mongoose
console.log("connecting MongoDB");
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) return console.error(err);
    console.log("MongoDB connection established");
});